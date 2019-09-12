import React from 'react'
import Player from './player/player'

const players = (props) => {
	const renderPlayers = props.playerData.map(player => 
		<Player 
			key={player.token} 
			token={player.token}
			name={player.name}
			score={player.score}/>)
	return(
		<div style={{display:"flex",flexFlow:"row",justifyContent:"flex-start",width:"300px",margin:"auto"}}>
			{renderPlayers}
		</div>
	)
}

export default players