import React from 'react'
import classes from './modal.module.css'

const Modal = (props) => {
	const renderPlayers = props.players.map(player => 
		<label>Player 1: <input key={player.token} placeholder="Your name" onChange={player.changed}></input><br/></label>)
	return(
		<div className={classes.container}>
				<div className={classes.modal}>
					<h2>Please enter the name of players</h2>
					{ renderPlayers }
				</div>
		</div>
	)
}

export default Modal