const Player = (symbol, color, num) => {
    const getSymbol = () => symbol;
    const getColor = () => color;
    const getNumber = () => num; 
    return {getSymbol, getColor, getNumber}
}

const Game = (p1, p2) => {
    let currentPlayer = p1;
    const  board = Gameboard();
    const ticTacBtns = document.querySelectorAll(".tic-button");

    const gameTurn = () => {
        currentPlayer = (currentPlayer == p1) ? p2 : p1
    }



    const gameSetup = () => {
        const rematch = document.querySelector(".rematch")
        const reset = document.querySelector("#reset")
        let i = 0
        let j = 0
        for (const btn of ticTacBtns) {
            btn.id = `${i},${j}`;
            j++;
            if (j == 3) {
                j = 0
                i++;
            }
        }
        ticTacBtns.forEach(button => button.addEventListener("click", btnSetUp))
        rematch.addEventListener("click", resetBoard)
        reset.addEventListener("click", resetScore)
    }

    const btnSetUp = (e) => {
        if (board.checkSpace(e.target.id)) {
            e.target.textContent = currentPlayer.getSymbol()
            e.target.style.color = currentPlayer.getColor()
            board.updateBoard(e.target.id, currentPlayer.getNumber())
            if (board.checkWin() == true) {
                win();
            }
            gameTurn();
        }
    }

    const resetBoard = () => {
        for (let btn of ticTacBtns) {
            btn.addEventListener("click", btnSetUp)
            btn.textContent = ""
        }
        board.resetBoard()
    }

    const win = () => {
        ticTacBtns.forEach(button => button.removeEventListener("click", btnSetUp))
        let score = document.querySelector(`#${currentPlayer.getSymbol()}`)
        score.textContent = Number(score.textContent) + 1
    }

    const resetScore = () => {
        const scores = document.querySelectorAll("span")
        for (const score of scores) {
            score.textContent = 0
        }
    }

    return {gameSetup}
}

const Gameboard = () => {
    const CreateBoard = () => {
        let boardArray = []
        for (let i = 0; i < 3; i++) {
            let row = [, , ,]
            boardArray.push(row)
        }
        return boardArray
    };
    
    let boardArray = CreateBoard();

    const resetBoard = () => {
        for (let i = 0; i < 3; i++) {
            boardArray[i] = [, , ,]
        }
    }
 
    const PrintBoard = () => {
        console.log(boardArray)
        console.log(boardArray[0])
    };

    const updateBoard = (coordinates, num) => {
        boardArray[Number(coordinates[0])][Number(coordinates[2])] = num
    }

    const checkSpace = (coordinates) => {
        if (boardArray[Number(coordinates[0])][Number(coordinates[2])] == null) {
            return true
        }
        else {
            return false
        }
    }

    const checkDiag = () => {
        let rightDiag = 0;
        let leftDiag = 0;
        let i = 0; 
        let j = 2;
        while (i <= 2) {
            rightDiag += boardArray[i][i]
            leftDiag += boardArray[i][j]
            i++;
            j--;
        }

        if (rightDiag == 3 || leftDiag == 3)  {
            return 3;
        }
        if (rightDiag == 0 || leftDiag == 0) {
            return 0;
        }

        return 4;
    }

    const checkColRow = () => {
        let row = 0;
        let col = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                row += boardArray[i][j]
                col += boardArray[j][i]
            }
            if (row == 3 || col == 3) {
                return 3
            }
            if (row == 0 || col == 0) {
                return 0
            }

            row = 0
            col = 0
        }
    
        return 4;
    }

    const checkWin = () => {
        let winNum = checkDiag();
        if (winNum == 0 || winNum == 3) {
            return true
        }
        winNum = checkColRow();
        if (winNum == 0 || winNum == 3) {
            return true
        }
        else {
            return false
        }
    }

    return {PrintBoard, updateBoard, checkSpace, checkWin, resetBoard};
};

const player1 = Player("X", "#75C2F6", 1);
const player2 = Player("O", "#FBEEAC", 0);

const game = Game(player1, player2);
game.gameSetup();

