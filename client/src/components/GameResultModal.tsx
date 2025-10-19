import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface GameResultModalProps {
  gameResult: 'win' | 'lose' | null;
  playerType: 'Odd' | 'Even';
  showModal: boolean;
  onContinue: () => void;
  onPlayAgain: () => void;
}

export default function GameResultModal({ 
  gameResult, 
  playerType, 
  showModal,
  onContinue, 
  onPlayAgain 
}: GameResultModalProps) {
  return (
    <Dialog open={showModal && gameResult !== null}>
      <DialogContent className="max-w-sm" showCloseButton={false}>
        <DialogHeader className="text-center">
          <div className="mb-4">
            {gameResult === 'win' ? (
              <div>
                <div className="text-6xl mb-4">😊</div>
                <DialogTitle className="text-3xl font-bold text-green-600 mb-2">
                  You Win!
                </DialogTitle>
              </div>
            ) : (
              <div>
                <div className="text-6xl mb-4">😢</div>
                <DialogTitle className="text-3xl font-bold text-red-600 mb-2">
                  You Lose!
                </DialogTitle>
              </div>
            )}
          </div>
          <DialogDescription className="text-gray-600">
            {gameResult === 'win' 
              ? `Congratulations! You got 5 ${playerType.toLowerCase()} numbers in a row!`
              : "Better luck next time! Your opponent got 5 in a row first."
            }
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex flex-col gap-3">
          <button 
            onClick={onContinue}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold"
          >
            close
          </button>
          <button 
            onClick={onPlayAgain}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold"
          >
            Play Again
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}