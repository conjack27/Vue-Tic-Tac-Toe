class Game {
    constructor() {
        this.inProgress = true
        this.winner = null // should be either O or X
        this.currentTurn = Game.O // should be either O or X
        this.movesMade = 0
        this.squares = new Array(9).fill().map(s => new Square())
    }

    // i will be the indexof the square we're making a move in
    makeMove(i) {
        // if the game is in progress & the square is empty, then set the value of the square to the current value (X or O)
        console.log(i)
        if (this.inProgress && !this.squares[i].value) {
            this.squares[i].value = this.currentTurn
        }

        this.movesMade++
        this.checkForWinner()
        //if the currentturn is O then change to X
        this.currentTurn = (this.currentTurn === Game.O) ? Game.X : Game.O
    }

    checkForWinner() {
        // Here we just define a 2d array with all the combination of threes that would mean a winning game.
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6], // a = 0, b = 3, c = 6
            [1, 4, 5],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        winningCombinations.forEach(wc => {
            // seperate each of our winning combinatiion indexes into three seperate parts
            const [a, b, c] = wc
            // next we set them to  an actual square object
            const sqA = this.squares[a]
            const sqB = this.squares[b]
            const sqC = this.squares[c]
            // check if all the squares are matching
            if (sqA.value && sqA.value === sqB.value && sqA.value === sqC.value) {
                // end the game
                this.inProgress = false
                // set the winner
                this.winner = sqA.value // X or O
                // set all the squares highlighted value to true
                sqA.isHighlighted = sqB.isHighlighted = sqC.isHighlighted = true
            }

            // Check for a tie
            if (this.movesMade === this.squares.length) {
                this.inProgress = false // in progress = false AND winner is null
            }
        })
    }
}

Game.O = 'O'
Game.X = 'X'