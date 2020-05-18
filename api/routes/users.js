var express = require('express');
var router = express.Router();
var mongoose = require("mongoose")
var user = require("../models/users")
var defaults = require("../../defaults")

// mongoose connection
mongoose.connect(defaults.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true})


// for creating a new user
router.post('/', function(req, res, next) {


	if(!req.body.userId)
		return res.status(406).json({msg: "userId not given"})


	// check if already present
	user.find({"user_id": req.body.userId}).exec()
	.then((resolve, reject) => {
		if(resolve.length > 0) {
			res.status(409).json({
				msg: `User (id: ${req.body.userId}) already exists`
			})
		}
		else {

			let newUser = new user({"user_id": req.body.userId, "name": req.body.name, "info": req.body.info})

			newUser.save()
			.then((resolve, reject) => {

				console.log(resolve);

				res.status(201).json({
					msg: `User (id: ${req.body.userId}) Created`,
					result: resolve
				})

			})
			.catch((err) => {

				console.log(err);
				res.status(500).json({
					msg: "Internal Server Error"
				})

			})

		}

	})
	.catch((err) => {
		res.status(500).json({
			msg: "Internal Server Error"
		})
	})


});


// for getting all users
router.get("/:userId?", (req, res) => {

	let query = {};
	if(req.params.userId) {
		query.user_id = req.params.userId
	}

	user.find(query).exec()
	.then((resolve, reject) => {

		console.log(resolve);

		if(query.user_id) {

			if(resolve.length == 0) {
				res.status(404).json({
					msg: `User (id: ${query.user_id}) not found`,
					result: resolve
				})
			}
			else {
				res.status(200).json({
					msg: `User (id: ${query.user_id}) found`,
					result: resolve[0]
				})
			}

		}
		else {

			if(resolve.length == 0) {
				res.status(404).json({
					msg: `No users present`,
					result: resolve
				})
			}
			else {
				res.status(200).json({
					msg: `list of all users`,
					result: resolve
				})
			}

		}

	})
	.catch((err) => {

		console.log(err);
		res.status(500).json({
			msg: "Internal Server Error"
		})

	})

})


// updating details
router.put("/:userId", (req, res) => {

	let update = {};

	// check for parameters to be updated
	if(req.body.info != undefined) update.info = req.body.info;
	if(req.body.name != undefined) update.name = req.body.name;


	user.updateOne({"user_id": req.params.userId}, update).exec()
	.then((resolve, reject) => {

		res.status(200).json({
			msg: `User (id: ${req.params.userId}) updated`,
			result: resolve
		})

	})
	.catch((err) => {

		console.log(err);
		res.status(500).json({
			msg: "Internal Server Error"
		})

	})

})


// deleting user from database
router.delete("/:userId", (req, res) => {

	user.deleteOne({"user_id": req.params.userId}).exec()
	.then((resolve, reject) => {

		console.log(resolve)
		if(resolve.n == 1 && resolve.deletedCount) {
			res.status(200).json({
				msg: `user (id: ${req.params.userId}) deleted`
			})
		}
		else if(resolve.n==0){
			res.status(404).json({
				msg: `user (id: ${req.params.userId}) not found`
			})
		}

	})
	.catch((err) => {

		console.log(err);
		res.status(500).json({
			msg: "Internal Server Error"
		})

	})

})


module.exports = router;
