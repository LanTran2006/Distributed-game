# Tic-Tac-Toe Server

A Node.js server with Express and Socket.IO for real-time tic-tac-toe gameplay.

## Features

- Express.js server
- Socket.IO for real-time communication
- Room-based multiplayer support
- CORS configured for client connection

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

## API Endpoints

- `GET /` - Server status check

## Socket Events

### Client to Server
- `join-room` - Join a game room
- `make-move` - Make a move in the game
- `reset-game` - Reset the current game
- `leave-room` - Leave a game room

### Server to Client
- `player-joined` - Another player joined the room
- `move-made` - A move was made by another player
- `game-reset` - The game was reset
- `player-left` - Another player left the room

## Environment Variables

- `PORT` - Server port (default: 3001)