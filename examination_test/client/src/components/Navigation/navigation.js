import React from 'react'
import classes from './navigation.module.css'
const navigation = () => {
	return(
		<div className={classes.container}>
			<div className={classes.link}>
				<a href="/">Game</a>
			</div>
			<div className={classes.link}>
				<a href="/scores">Scoreboard</a>
			</div>
		</div>

	)
}

export default navigation