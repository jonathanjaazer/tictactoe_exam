const mongoose = require('mongoose')

const playerSchema = mongoose.Schema({
	name:{type: String, require: true},
	score:{type: Number, required: true}
})

module.exports = mongoose.model("Player", playerSchema)