const SIZE = 4;
let grid = [];

function initializeGrid() {
    grid = [];
    for (let i = 0; i < SIZE; i++) {
        let row = [];
        for (let j = 0; j < SIZE; j++) {
            row.push(0);
        }
        grid.push(row);
    }
}

function addNewTile() {
    const emptyCells = [];
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (grid[i][j] === 0) {
                emptyCells.push({ row: i, col: j });
            }
        }
    }

    if (emptyCells.length > 0) {
        const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

function renderGrid() {
    const gameGrid = document.getElementById('gameGrid');
    gameGrid.innerHTML = '';

    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.innerText = grid[i][j] !== 0 ? grid[i][j] : '';
            tile.style.backgroundColor = getTileColor(grid[i][j]);
            gameGrid.appendChild(tile);
        }
    }
}

function getTileColor(value) {
    const tileColors = {
        2: '#eee4da',
        4: '#ede0c8',
        8: '#f2b179',
        16: '#f59563',
        32: '#f67c5f',
        64: '#f65e3b',
        128: '#edcf72',
        256: '#edcc61',
        512: '#edc850',
        1024: '#edc53f',
        2048: '#edc22e'
    };

    return tileColors[value] || '#cdc1b4';
}

function resetGame() {
    initializeGrid

    initializeGrid();
    addNewTile();
    addNewTile();
    renderGrid();
}

function moveTiles(direction) {
    const previousGrid = JSON.parse(JSON.stringify(grid));

    switch (direction) {
        case 'left':
            moveLeft();
            break;
        case 'right':
            moveRight();
            break;
        case 'up':
            moveUp();
            break;
        case 'down':
            moveDown();
            break;
    }

    if (hasGridChanged(previousGrid)) {
        addNewTile();
        renderGrid();

        if (isGameOver()) {
            alert('Game Over!');
        }
    }
}

function moveLeft() {
    for (let i = 0; i < SIZE; i++) {
        let row = grid[i];
        row = mergeTiles(row);
        row = compressTiles(row);
        grid[i] = row;
    }
}

function moveRight() {
    for (let i = 0; i < SIZE; i++) {
        let row = grid[i].reverse();
        row = mergeTiles(row);
        row = compressTiles(row);
        row.reverse();
        grid[i] = row;
    }
}

function moveUp() {
    for (let j = 0; j < SIZE; j++) {
        let column = [];
        for (let i = 0; i < SIZE; i++) {
            column.push(grid[i][j]);
        }
        column = mergeTiles(column);
        column = compressTiles(column);
        for (let i = 0; i < SIZE; i++) {
            grid[i][j] = column[i];
        }
    }
}

function moveDown() {
    for (let j = 0; j < SIZE; j++) {
        let column = [];
        for (let i = 0; i < SIZE; i++) {
            column.push(grid[i][j]);
        }
        column.reverse();
        column = mergeTiles(column);
        column = compressTiles(column);
        column.reverse();
        for (let i = 0; i < SIZE; i++) {
            grid[i][j] = column[i];
        }
    }
}

function mergeTiles(rowOrColumn) {
    for (let i = 0; i < SIZE - 1; i++) {
        if (rowOrColumn[i] === rowOrColumn[i + 1]) {
            rowOrColumn[i] *= 2;
            rowOrColumn[i + 1] = 0;
        }
    }
    return rowOrColumn;
}

function compressTiles(rowOrColumn) {
    const compressedRowOrColumn = [];
    for (let i = 0; i < SIZE; i++) {
        if (rowOrColumn[i] !== 0) {
            compressedRowOrColumn.push(rowOrColumn[i]);
        }
    }
    while (compressedRowOrColumn.length < SIZE) {
        compressedRowOrColumn.push(0);
    }
    return compressedRowOrColumn;
}

function hasGridChanged(previousGrid) {
    return JSON.stringify(previousGrid) !== JSON.stringify(grid);
}

function isGameOver() {
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (grid[i][j] === 0) {
                return false;
            }
            if (i < SIZE - 1 && grid[i][j] === grid[i + 1][j]) {
                return false;
            }
            if (j < SIZE - 1 && grid[i][j] === grid[i][j + 1]) {
                return false;
            }
        }
        return true;
    }
}

// Event listeners for arrow key presses
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        moveTiles('left');
    } else if (event.key === 'ArrowRight') {
        moveTiles('right');
    } else if (event.key === 'ArrowUp') {
        moveTiles('up');
    } else if (event.key === 'ArrowDown') {
        moveTiles('down');
    }
});

// Start a new game
resetGame();