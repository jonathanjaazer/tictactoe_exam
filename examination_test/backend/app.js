const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Player = require('./model/player')

mongoose.connect("mongodb://127.0.0.1:27017/dbTictactoe").then(() => {
	console.log('Successfully connected to a database')
}).catch((error) => {
	console.log("Unable to connect to a database")
	console.error(error)
})

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/api/data', (req, res, next) => {
	Player.find().sort({score:-1}).then((players) => {
		res.status(200).json(players)
	}).catch((error) => {
		res.status(400).json({
			error: error
		})
	})
})
app.post('/api/addplayer', (req, res, next) => {
	const player = new Player({
		name: req.body.name,
		score: req.body.score
	})

	player.save().then(() => {
		res.status(201).json({
			message: "Successfully added to database"
		})
	}).catch((error) => {
		res.status(400).json({
			error: error
		})
	})
	console.log(req.body)
})

module.exports = app


