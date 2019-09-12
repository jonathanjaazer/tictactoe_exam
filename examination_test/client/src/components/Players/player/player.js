import React from 'react'
import classes from './player.module.css'

const player = (props) => {
	return(
		<div className={classes.container}>
			<div className={classes.items}>
				<p><strong>Player {props.token === "X" ? "1":"2"}</strong></p>
				<p>{props.token}</p>
			</div>
			<div className={classes.items}>
				<label>Name: {props.name}</label>
			</div>
			<div className={classes.items}>
				<label>Score: {props.score}</label>
			</div>
		</div>
	)
}

export default player