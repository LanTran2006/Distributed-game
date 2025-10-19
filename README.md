# 🎮 Distributed 5x5 Number Game

A real-time multiplayer strategy game where two players compete on a 5x5 grid to get five of their numbers (odd or even) in a row. Built with React, TypeScript, Socket.IO, and modern web technologies.

## 🌟 Features

### 🚀 Real-time Multiplayer
- **Instant synchronization** between players using Socket.IO
- **Live board updates** as players make moves
- **Real-time opponent making** system

### 🎯 Game Mechanics
- **5x5 Interactive Grid** - Click any cell to increment its value
- **Odd vs Even Strategy** - Players are assigned odd or even numbers
- **Multiple Win Conditions** - Win by getting 5 in a row:
  - Horizontal rows
  - Vertical columns
  - Main diagonal (top-left to bottom-right)
  - Anti-diagonal (top-right to bottom-left)

### 🎨 Visual Experience
- **Dynamic Win Highlighting** - Visual lines show winning patterns
- **Color-coded Results** - Blue for wins, red for losses
- **Modern UI** - Built with shadcn/ui and Tailwind CSS


### 🏗️ Technical Features
- **TypeScript** - Full type safety across client and server
- **Modern React** - Hooks, context, and functional components
- **Socket.IO** - Reliable real-time communication
- **Express.js** - Robust server architecture
- **Vite** - Fast development and building
- **ESLint** - Code quality and consistency

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality component library
- **Socket.IO Client** - Real-time communication
- **React Toastify** - Elegant notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web server framework
- **Socket.IO** - Real-time bidirectional communication
- **TypeScript** - Type-safe server development
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd distributed-game
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### 🏃‍♂️ Running the Application

#### Development Mode

1. **Start the server** (Terminal 1)
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start the client** (Terminal 2)
   ```bash
   cd client
   npm run dev
   ```
   Client will run on `http://localhost:5173`

3. **Open multiple browser tabs** to `http://localhost:5173` to test multiplayer functionality

#### Production Mode

1. **Build and start the server**
   ```bash
   cd server
   npm run build
   npm start
   ```

2. **Build and preview the client**
   ```bash
   cd client
   npm run build
   npm run preview
   ```

## 🎮 How to Play

1. **Start the Game** - Click "Play Game" on the main menu
2. **Find Opponent** - Click "Find Player" to search for an opponent
3. **Wait for Match** - System will automatically match you with another player
4. **Accept Game** - Both players must click "Start Game" to begin
5. **Make Moves** - Click any cell on the 5x5 grid to increment its value
6. **Win Condition** - Get 5 of your numbers (odd/even) in a row
8. **Play Again** - Use "Play Again" to find a new opponent

### Game Rules
- **Player Types**: One player gets odd numbers (1, 3, 5, 7, 9...), the other gets even numbers (2, 4, 6, 8, 10...)
- **Moves**: Clicking a cell increments its value by 1
- **Winning**: First player to get 5 of their number type in a row wins
- **No Take-backs**: Once you click a cell, the move is permanent

## 📁 Project Structure

```
distributed-game/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   ├── Board.tsx    # Game board component
│   │   │   ├── Game.tsx     # Main game logic
│   │   │   ├── WaitingRoom.tsx # Matchmaking UI
│   │   │   ├── GameResultModal.tsx # Win/lose modal
│   │   │   └── ConfirmBox.tsx # Confirmation dialogs
│   │   ├── context/         # React context
│   │   │   └── SocketContext.tsx # Socket.IO context
│   │   ├── lib/             # Utility functions
│   │   └── App.tsx          # Main app component
│   ├── package.json
│   └── vite.config.ts
└── server/                   # Node.js backend
    ├── src/
    │   ├── utils/
    │   │   └── index.ts     # Game logic utilities
    │   └── server.ts        # Main server file
    ├── package.json
    └── tsconfig.json
```

## 🔧 Available Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server

## 🌐 Socket Events

### Client to Server
- `find-opponent` - Search for an opponent
- `start-game` - Accept and start the game
- `update-board` - Make a move on the board
- `leave-game` - Leave the current game

### Server to Client
- `opponent-found` - Opponent has been matched
- `game-started` - Game has begun
- `board-updated` - Board state has changed
- `game-result` - Game has ended with win/lose result
- `opponent-disconnected` - Opponent has left the game
