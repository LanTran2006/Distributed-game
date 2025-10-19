import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Game from "@/components/Game";
import WaitingRoom from "@/components/WaitingRoom";
import { useSocket } from "@/context/SocketContext";
import { showToast } from "@/lib/toast";

type AppState = 'menu' | 'waiting' | 'game';

function App() {
  const [currentView, setCurrentView] = useState<AppState>('menu');
  const [isFirst, setIsFirst] = useState<boolean>(false);
  const { socket } = useSocket();

  useEffect(() => {
    socket?.on('game-started', (data:any) => {
      setIsFirst(data.isFirst);
      setCurrentView('game');
    });

    socket?.on('opponent-disconnected', () => {
      showToast.gameEvent('Opponent disconnected', 'disconnect');
      setCurrentView('menu');
    });
  }, [socket]);

  if (currentView === 'game') {
    return <Game isFirst={isFirst} setView={setCurrentView} />;
  }

  if (currentView === 'waiting') {
    return (
      <WaitingRoom 
        onBack={() => setCurrentView('menu')}
      />
    );
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Distributed Game
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Welcome to the 5x5 Game Board Experience
        </p>
        <Button 
          onClick={() => setCurrentView('waiting')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg rounded-lg"
        >
          Play Game
        </Button>
      </div>
      
    </div>
  )
}

export default App