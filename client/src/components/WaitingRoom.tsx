import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/context/SocketContext";

interface WaitingRoomProps {
  onBack: () => void;
}

export default function WaitingRoom({  onBack }: WaitingRoomProps) {
  const [isLoading, setIsLoading] = useState<'user-find' | 'user-accept' | null>(null);
  const [playerFound, setPlayerFound] = useState(false);
  const [opponentName, setOpponentName] = useState("");
  const { socket } = useSocket();

  useEffect(() => {
      socket?.on('opponent-found', (data) => {
        setOpponentName(data.opponent);
        setPlayerFound(true);
        setIsLoading(null);
      });
  }, [socket]);

  const handleStartSearch = () => {
    setIsLoading('user-find');
    socket?.emit('find-opponent')
  };

  const handlePlayGame = () => {
    setIsLoading('user-accept');
    setPlayerFound(false);
    socket?.emit('start-game');
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Waiting Room
          </h1>
          
          {!isLoading && !playerFound && (
            <div className="space-y-6">
              <p className="text-lg text-gray-600">
                Ready to find an opponent?
              </p>
              <div className="space-y-4">
                <Button 
                  onClick={handleStartSearch}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg"
                >
                  Find Player
                </Button>
                <Button 
                  onClick={onBack}
                  variant="outline"
                  className="w-full py-3 text-lg"
                >
                  Back to Menu
                </Button>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className={`animate-spin rounded-full h-16 w-16 border-b-2 ${isLoading === 'user-find' ? 'border-blue-500' : 'border-orange-500'}`}></div>
                <p className="text-lg text-gray-700 font-medium">
                  {isLoading === 'user-find' ? 'Searching for players...' : 'Waiting for opponent accept'}
                </p>
                <p className="text-sm text-gray-500">
                  {isLoading === 'user-find' ? 'This may take a moment' : 'Your opponent needs to confirm to start the game'}
                </p>
              </div>
              <div className="space-y-3">
                <Button 
                  onClick={() => {
                    setIsLoading(null);
                    if (isLoading === 'user-accept') {
                      setPlayerFound(true);
                    }
                  }}
                  variant="outline"
                  className="w-full py-3"
                >
                  Cancel 
                </Button>
                <Button 
                  onClick={onBack}
                  variant="outline"
                  className="w-full py-3 border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          )}

          {playerFound && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <p className="text-lg font-semibold text-green-800">
                    Player Found!
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Opponent:</span> {opponentName}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={handlePlayGame}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg"
                >
                  Start Game
                </Button>
               
                <Button 
                  onClick={onBack}
                  variant="outline"
                  className="w-full py-3 border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">0</p>
                <p className="text-sm text-gray-500">Games Won</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">0</p>
                <p className="text-sm text-gray-500">Games Played</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}