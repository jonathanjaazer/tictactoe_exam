import React from 'react'
import classes from './data.module.css'

const dataFormat = (props) => {
	return(
		<div className={classes.row}>
			<div className={classes.item}>
				{props.name}
			</div>
			<div className={classes.item}>
				{props.score}
			</div>
		</div>
	)
}

export default dataFormat