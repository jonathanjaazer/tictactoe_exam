import React from 'react'
import classes from './board.module.css'
import Cell from './cell'

const Board = (props) => {
	const identifiers = [1,2,3,4,5,6,7,8,9]
	const renderCells = identifiers.map(cells => (<Cell 
		key={cells} 
		value={props.value[cells - 1]} 
		token={() => props.token(cells)}
		disabled={props.disabled}
		>{props.value[cells - 1]}</Cell>))

	return(
		<div className={classes.board}>
			{renderCells}
		</div>
	)
}
export default Board