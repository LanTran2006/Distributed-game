
 export interface WinResult {
  winner: 'odd' | 'even';
  type: 'row' | 'column' | 'diagonal-main' | 'diagonal-anti';
  pattern: number[];
}

export function checkWinner(board: number[]): WinResult | null {
    // Define winning patterns for 5x5 grid with their types
    const winPatterns = [
      // Rows
      { pattern: [0, 1, 2, 3, 4], type: 'row' as const },
      { pattern: [5, 6, 7, 8, 9], type: 'row' as const },
      { pattern: [10, 11, 12, 13, 14], type: 'row' as const },
      { pattern: [15, 16, 17, 18, 19], type: 'row' as const },
      { pattern: [20, 21, 22, 23, 24], type: 'row' as const },
      // Columns
      { pattern: [0, 5, 10, 15, 20], type: 'column' as const },
      { pattern: [1, 6, 11, 16, 21], type: 'column' as const },
      { pattern: [2, 7, 12, 17, 22], type: 'column' as const },
      { pattern: [3, 8, 13, 18, 23], type: 'column' as const },
      { pattern: [4, 9, 14, 19, 24], type: 'column' as const },
      // Diagonals
      { pattern: [0, 6, 12, 18, 24], type: 'diagonal-main' as const },
      { pattern: [4, 8, 12, 16, 20], type: 'diagonal-anti' as const }
    ];

    for (const { pattern, type } of winPatterns) {
      const values = pattern.map(index => board[index]);
      if (values.every(val => val > 0 && val % 2 === 1)) {
        return { winner: 'odd', type, pattern };
      }
      if (values.every(val => val > 0 && val % 2 === 0)) {
        return { winner: 'even', type, pattern };
      }
    } 
    return null;
  }