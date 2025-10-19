interface BoardProps {
  board: number[];
  onCellClick: (index: number) => void;
  winPattern?: number[] | null;
  winType?: 'row' | 'column' | 'diagonal-main' | 'diagonal-anti' | null;
  gameResult?: 'win' | 'lose' | null;
}

export default function Board({ board, onCellClick, winPattern, winType, gameResult }: BoardProps) {
  const getWinLineClasses = () => {
    if (!winPattern || !winType) return { className: 'hidden', style: {} };

    const gridSize = 5;
    const isWin = gameResult == 'win';
    const lineColor = isWin ? 'bg-blue-500' : 'bg-red-500';
    
    switch (winType) {
      case 'row': {
        const rowIndex = Math.floor(winPattern[0] / gridSize);
        return {
          className: `absolute h-1 ${lineColor} rounded-sm z-10 left-[8%] right-[8%]`,
          style: { top: `${(rowIndex * 20) + 10}%` }
        };
      }
      case 'column': {
        const colIndex = winPattern[0] % gridSize;
        return {
          className: `absolute w-1 ${lineColor} rounded-sm z-10 top-[8%] bottom-[8%]`,
          style: { left: `${(colIndex * 20) + 10}%` }
        };
      }
      case 'diagonal-main': {
        return {
          className: `absolute h-1 ${lineColor} rounded-sm z-10 top-[10%] left-[10%] w-[80%] origin-left transform rotate-45 scale-x-[1.41]`,
          style: {}
        };
      }
      case 'diagonal-anti': {
        return {
          className: `absolute h-1 ${lineColor} rounded-sm z-10 top-[10%] right-[10%] w-[80%] origin-right transform -rotate-45 scale-x-[1.41]`,
          style: {}
        };
      }
      default:
        return { className: 'hidden', style: {} };
    }
  };

  const winLineConfig = getWinLineClasses();
  const isWin = gameResult === 'win';
  const cellHighlightClass = isWin ? 'bg-blue-50 border-blue-300' : 'bg-red-50 border-red-300';

  return (
    <div className="relative mb-6">
      <div className="grid grid-cols-5 gap-1 bg-gray-200 p-2 rounded-lg">
        {board?.map((cell, index) => (
          <button
            key={index}
            onClick={() => onCellClick(index)}
            className={`aspect-square bg-white border-2 border-gray-300 rounded-md 
                       hover:bg-gray-50 hover:border-gray-400 transition-colors
                       flex items-center justify-center text-xl font-bold
                       active:scale-95 transform
                       ${winPattern?.includes(index) ? cellHighlightClass : ''}`}
          >
            {cell}
          </button>
        ))}
      </div>
      
      {/* Win line overlay */}
      {winPattern && winType && (
        <div 
          className={winLineConfig.className}
          style={winLineConfig.style}
        />
      )}
    </div>
  );
}