import React, {Component} from 'react'
import classes from "./data.module.css"
import DataFormat from "./dataformat"

class Data extends Component{
	state = {
		players:[
		]
	}
	componentDidMount(){
		fetch("http://localhost:5000/api/data").then(
			res => res.json()).then(
				json => this.setState({players: json})
			)
	}
	render(){
		const renderPlayer = this.state.players.map(player => 
			<DataFormat 
				key={player._id} 
				name={player.name}
				score={player.score}/>)

		return(
			<div className={classes.container}>
				<div className={classes.row}>
					<div className={classes.item}>
						Name
					</div>
					<div className={classes.item}>
						Score
					</div>
				</div>
					{renderPlayer}
			</div>
		)
	}
}
export default Data