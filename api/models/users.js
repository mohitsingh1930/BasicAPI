const mongoose = require("mongoose")


var schema = mongoose.Schema({
	"user_id": {type: Number, required: true},
	"name": {type: String},
	"info": {type: String},
	"date_created": {type: Date, default: Date.now()}
})


module.exports = mongoose.model("users", schema)