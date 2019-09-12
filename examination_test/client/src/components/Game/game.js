import React, {Component} from 'react'
import Board from '../Board/board'
import classes from './game.module.css'
import Players from '../Players/players'

class Game extends Component{
	state = {
		cells: ['1','2','3','4','5','6','7','8','9'],
		cellClicks: 0,
		players: [
			{
				token: "X",
				name: "Juan dela Cruz",
				score: 0
			},
			{
				token: "O",
				name: "John Doe",
				score: 0
			}
		],
		xIsNext: true,
		disabled: false
	}

	//patterns of win the game
	calculateWinner = (i) => {
		const patterns = [
			[0,1,2],
			[3,4,5],
			[6,7,8],
			[0,3,6],
			[1,4,7],
			[2,5,8],
			[0,4,8],
			[2,4,6]
		]
		const cells = i
		for(let x = 0;x < patterns.length;x++){
			let [a, b, c] = patterns[x]
			if(cells[a] && cells[a] === cells[b] && cells[a] === cells[c]){
				return cells[a]
			}
		}
		return null
	}

	scoreBoard = (token) => {
		if(token === null)
			return this.state.players
		else{
			const newPlayers = [...this.state.players]
			const playerX = {...newPlayers[0]}
			const playerO = {...newPlayers[1]}
			if(playerX.token === token)
			{
				playerX.score = this.state.players[0].score + 1
			}
			else
				playerO.score = this.state.players[1].score + 1

			newPlayers[0] = playerX
			newPlayers[1] = playerO
			return newPlayers
		}
	}

	//each time the cell is click the cell state will update values
	handleClicked = (no) => {
		const winner = this.calculateWinner(this.state.cells)
		if( winner === null)
		{
			const newCells = [...this.state.cells]
			if(newCells[no - 1] === "X" || newCells[no - 1] === "O"){
				alert("The cell number is already pick")
				return
			}
			//take note that the value of number from element starts with 1 but array counting starts with 0 (no - 1)
			newCells[no - 1] = this.state.xIsNext ? 'X' : 'O'

			//to add some scores to a player
			const newPlayers = this.scoreBoard(this.calculateWinner(newCells))
			//to update the states
			this.setState(
				{
					players: newPlayers, 
					cells: newCells,
					cellClicks:this.state.cellClicks + 1, 
					xIsNext: !this.state.xIsNext
				}
			)	
		}
	}

	//handles or detects key presses to manipulate the cell click
	handleKey = (key) => {
			if(key.key > 0 && key.key <= 9)
				this.handleClicked(key.key)
			else{
				if(key.key === "Escape"){
					this.resetGame()
					return
				}
				alert('Unidentified cell number')
			}
	}

	resetGame = () => {
		this.setState({cellClicks:0,cells: [1,2,3,4,5,6,7,8,9],xIsNext:true})
		alert('Cells has been reset')
	}

	declaredWinner = (x) => {
			let playerx = {...this.state.players[0]}
			let playero = {...this.state.players[1]}
			let winner = null
			if(playerx.score < playero.score)
				winner = "O"
			if(playerx.score > playero.score)
				winner = "X"
			return winner
	}

	restartGame = () => {
		if(this.declaredWinner()){
			this.sendData(this.declaredWinner())
		}
		else{
			alert('The scoreboard is a tie. Please continue playing. Press ESC to restart cells')
			return
		}
		const playerCopy = [...this.state.players]
		playerCopy[0].score = 0
		playerCopy[1].score = 0
		this.setState({players: playerCopy, cellClicks:0,cells: [1,2,3,4,5,6,7,8,9],xIsNext:true})
	}

	componentDidMount(){
		//handles or detects key presses to manipulate the cell click
		document.onkeydown = (key) => this.handleKey(key)
	}

	sendData = (data) => {
		for(let x = 0; x < 2; x++){
			if(this.state.players[x].token === data){
				const xhr = new XMLHttpRequest();
				xhr.open("POST", "http://localhost:5000/api/addplayer", true)
				xhr.setRequestHeader('Content-Type', 'application/json')
				xhr.send(JSON.stringify(this.state.players[x]))
				console.log(this.state.players[x])
			}
		}
		return
	}

	render(){
		const declaredWinner = this.calculateWinner(this.state.cells)
		const player = this.state.xIsNext ? 'Your turn Player 1' : 'Your turn Player 2'
		const renderHeader = (<h3>{declaredWinner ? "Player " + (declaredWinner === "X" ? "1" : "2") + " Wins!": player}</h3>)
		
		return(
		<div>
			<div className={classes.container}>
				<div className={classes.header}>
					{(this.state.cellClicks === 9 && declaredWinner === null) ? 
						<h3>The game is draw</h3> : 
						renderHeader}
				</div>
				<Board
					token={this.handleClicked}
					value={this.state.cells}
					disabled={this.state.disabled}/>
				<Players playerData={this.state.players}/>
				<br/>
				<button onClick={this.restartGame}>RESTART</button>
				<br/>
				<p>PRESS <strong>ESC</strong> TO RESET THE CELLS <br/> or <br/> CLICK <strong>RESTART</strong> TO RESTART THE SCOREBOARD</p>
			</div>
		</div>
		)
	}
}

export default Game