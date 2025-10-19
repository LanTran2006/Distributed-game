import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { checkWinner } from "./utils";
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Tic-Tac-Toe Server is running!" });
});

let players: any = [];
let matchedPlayers = new Map();
let boardmap=new Map();
io.on("connection", (socket) => {

  socket.on("find-opponent", () => {
    players.push(socket.id);

    if (players.length >= 2) {
      const player1 = players.shift();
      const player2 = players.shift();

      if (player1 && player2) {
        matchedPlayers.set(player1, { id: player2, isReady: false,isFirst: true });
        matchedPlayers.set(player2, { id: player1, isReady: false,isFirst: false });
        io.to(player1).emit("opponent-found", { opponent: player2 });
        io.to(player2).emit("opponent-found", { opponent: player1 });
      }
    }
  });

  socket.on("start-game", () => {
    const opponent = matchedPlayers.get(socket.id);
    console.log(matchedPlayers);
    if (opponent) {
      let myself=matchedPlayers.get(opponent.id)
      myself.isReady = true;
      if (opponent.isReady) {
        const roomName = `room-${socket.id}-${opponent.id}`;
        socket.join(roomName);
        io.sockets.sockets.get(opponent.id)?.join(roomName);
        io.to(socket.id).emit("game-started", { roomName, isFirst: myself.isFirst});
        io.to(opponent.id).emit("game-started", { roomName, isFirst: opponent.isFirst });
        let data={
            board: Array(5*5).fill(0),
            odd: myself.isFirst ?  myself.id : opponent.id ,
            even: myself.isFirst ? opponent.id :  myself.id
        }
        boardmap.set(roomName,data)
        
      }
    }
  });

  socket.on("update-board", (data) => {
    const { index, roomName } = data;
    const board = boardmap.get(roomName);
    
    if (board) {
      board.board[index] += 1;
      boardmap.set(roomName, board);
      
      // Check for win conditions
      const winResult = checkWinner(board.board);
      
      if (winResult) {
        // Find the room data to get player IDs
        const info = boardmap.get(roomName);
        if (info) {
          const playerOdd = info.odd;
          const playerEven = info.even;
          if (winResult.winner === 'odd') {
            io.to(playerOdd).emit('game-result', { 
              result: 'win', 
              board: board.board, 
              winType: winResult.type, 
              winPattern: winResult.pattern 
            });
            io.to(playerEven).emit('game-result', { 
              result: 'lose', 
              board: board.board, 
              winType: winResult.type, 
              winPattern: winResult.pattern 
            });
          } else {
            io.to(playerOdd).emit('game-result', { 
              result: 'lose', 
              board: board.board, 
              winType: winResult.type, 
              winPattern: winResult.pattern 
            });
            io.to(playerEven).emit('game-result', { 
              result: 'win', 
              board: board.board, 
              winType: winResult.type, 
              winPattern: winResult.pattern 
            });
          }
        }
      } else {
        io.to(roomName).emit('board-updated', { board: board.board });
      }
    }
  });

 
  const handlePlayerLeave = (socketId: string) => {
    console.log('Player left:', socketId);
    // Remove from players array if waiting for match
    const playerIndex = players.indexOf(socketId);
    if (playerIndex > -1) {
      players.splice(playerIndex, 1);
    }
    // Handle matched players disconnect
    const opponent = matchedPlayers.get(socketId);
    console.log(matchedPlayers, socketId);
    if (opponent) {
      io.to(opponent?.id).emit('opponent-disconnected');
    }
    io.socketsLeave(`room-${socketId}-${opponent?.id}`);
    io.socketsLeave(`room-${opponent?.id}-${socketId}`);
    matchedPlayers.delete(socketId);
    matchedPlayers.delete(opponent?.id);
  };

  socket.on("leave-game", () => {
    handlePlayerLeave(socket.id);
  });


  socket.on("disconnect", () => {
    handlePlayerLeave(socket.id);
  });

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Socket.IO server ready for connections`);
});



