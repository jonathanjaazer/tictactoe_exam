import React from 'react'
import classes from './board.module.css'

const Cell = (props) => {
	return(
		<button 
			className={classes.cell} 
			onClick={props.token}
			disabled={props.disabled}>
			{props.children}
		</button>
	)
}

export default Cell