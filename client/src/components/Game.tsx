import { useState, useEffect } from "react";
import { useSocket } from "@/context/SocketContext";
import Board from "./Board";
import GameResultModal from "./GameResultModal";
import ConfirmBox from "./ConfirmBox";
import { Button } from "@/components/ui/button";

interface GameState {
  result: 'win' | 'lose' | null;
  winType: 'row' | 'column' | 'diagonal-main' | 'diagonal-anti' | null;
  winPattern: number[] | null;
}

interface GameProps {
  isFirst: boolean;
  setView: (view: 'menu' | 'waiting' | 'game') => void;
}

export default function Game({ isFirst, setView }: GameProps) {
  const [board, setBoard] = useState<number[]>(Array(5 * 5).fill(0));
  const [gameState, setGameState] = useState<GameState>({
    result: null,
    winType: null,
    winPattern: null,
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const playerType: "Odd" | "Even" = isFirst ? "Odd" : "Even";
  const { socket, roomName } = useSocket();

  useEffect(() => {
    socket?.on("board-updated", (data) => {
      setBoard(data.board);
    });

    socket?.on("game-result", (data) => {
      setBoard(data.board);
      setGameState({
        result: data.result,
        winType: data.winType,
        winPattern: data.winPattern,
      });
      setShowModal(true);
    });
  }, [socket]);
  
  const handleCellClick = (index: number) => {
    if (gameState.result) return
    socket?.emit("update-board", { index, roomName });
  };

  const handleHomeClick = () => {
    if (gameState.result) {
      // Game is over, no need to confirm
      setView('menu');
    } else {
      // Game is active, show confirmation
      setShowConfirm(true);
    }
  };

  const confirmLeave = () => {
    setShowConfirm(false);
    // Emit leave-game event to notify server and opponent
    socket?.emit("leave-game");
    setView('menu');
  };

  const cancelLeave = () => {
    setShowConfirm(false);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex gap-5 items-center mb-6">
          <Button
            onClick={handleHomeClick}
            variant="outline"
            size="sm"
            className="text-gray-700"
          >
            ← Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">
            5x5 Number Game
          </h1>
          
        </div>

        <div className="text-center mb-6">
          <div
            className={`inline-block px-4 py-2 rounded-lg font-semibold text-lg ${
              playerType === "Odd"
                ? "bg-blue-100 text-blue-800 border-2 border-blue-300"
                : "bg-green-100 text-green-800 border-2 border-green-300"
            }`}
          >
            You are: <span className="font-bold">{playerType}</span> Player
          </div>
        </div>

        {/* 5x5 Grid */}
        <Board 
          board={board} 
          onCellClick={handleCellClick} 
          winPattern={gameState.winPattern}
          winType={gameState.winType}
          gameResult={gameState.result}
        />

        <div className="text-center space-y-2 mb-6">
          <p className="text-sm text-gray-600">
            Click any square to increment by 1
          </p>
          <p className="text-xs text-gray-500">
            Goal: Get your numbers (Odd/Even) in a row
          </p>
        </div>

        {/* Game Result Modal */}
        <GameResultModal
          gameResult={gameState.result}
          playerType={playerType}
          showModal={showModal}
          onContinue={() => setShowModal(false)}
          onPlayAgain={() => setView('waiting')}
        />

        {/* Confirm Leave Dialog */}
        <ConfirmBox
          isOpen={showConfirm}
          title="Leave Game?"
          message="Are you sure you want to leave? The current game will be lost and your opponent will be notified."
          confirmText="Leave Game"
          cancelText="Stay"
          onConfirm={confirmLeave}
          onCancel={cancelLeave}
        />
      </div>
    </div>
  );
}
