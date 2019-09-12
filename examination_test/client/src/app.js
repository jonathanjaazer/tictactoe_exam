import React, {Component} from 'react'
import Game from './components/Game/game'
import Data from './components/Data/data'
import Navigation from './components/Navigation/navigation'
import {Route, Switch} from 'react-router-dom'
class App extends Component{

	render(){
		return (
			<div>
				<Navigation/>
				<Switch>
					<Route path="/" exact component={Game}/>
					<Route path="/scores" component={Data}/>
				</Switch>
			</div>
		)
	}
}

export default App