// Game state variables
let currentPlayer = 'X'; // Starts with Player X
let board = ['', '', '', '', '', '', '', '', '']; // 3x3 board array (empty strings for empty cells)
let gameActive = true; // Flag to track if the game is ongoing
let gameCells = []; // Reference to all cell elements

// Status display element
const statusDisplay = document.getElementById('status');

// Board element (for event delegation)
const boardElement = document.getElementById('board');

// Reset button
const resetButton = document.getElementById('reset');

// Winning combinations: rows, columns, diagonals
const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Main diagonal
    [2, 4, 6]  // Anti-diagonal
];

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', initializeGame);

// Function to initialize the game: set up event listeners and cache cells
function initializeGame() {
    // Cache all cell elements
    gameCells = document.querySelectorAll('.cell');
    
    // Add click event listener to each cell
    gameCells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    // Add reset event listener
    resetButton.addEventListener('click', resetGame);
    
    // Set initial status
    updateStatus();
}

// Function to handle cell clicks (user interaction)
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index')); // Get cell index from data attribute
    
    // Prevent clicks if game is not active or cell is already filled
    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    
    // Make the move
    makeMove(clickedCellIndex, clickedCell);
}

// Function to make a player's move
function makeMove(cellIndex, cellElement) {
    // Update board array and cell display
    board[cellIndex] = currentPlayer;
    cellElement.textContent = currentPlayer;
    cellElement.classList.add(currentPlayer.toLowerCase()); // Add CSS class for styling (x or o)
    
    // Disable the cell to prevent further clicks
    cellElement.style.pointerEvents = 'none';
    
    // Check for win or tie after the move
    if (checkWin()) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (checkTie()) {
        statusDisplay.textContent = 'It\'s a tie!';
        gameActive = false;
    } else {
        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }
}

// Function to check for a win (three in a row/column/diagonal)
function checkWin() {
    return winningConditions.some(condition => {
        // Check if all three cells in the condition are the same and not empty
        return condition.every(index => board[index] === currentPlayer);
    });
}

// Function to check for a tie (board full with no winner)
function checkTie() {
    return board.every(cell => cell !== '');
}

// Function to update the status display
function updateStatus() {
    if (gameActive) {
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Function to reset the game for a new round
function resetGame() {
    // Reset game state
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    
    // Clear cell displays and re-enable them
    gameCells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        cell.style.pointerEvents = 'auto';
    });
    
    // Update status
    updateStatus();
}

// Prevent further moves after game ends by disabling all cells (called implicitly via gameActive flag)

