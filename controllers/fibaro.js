const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

//route to endpoint is defined in routes/routes.js and server.js

//Get info from a specific node
exports.getNode = async (req,res) => {
	var id = req.params.id;
	console.log(process.env.FIB_URL);
    var request = require('request'),
    url = process.env.FIB_URL,
    auth = process.env.FIB_AUTH;
	await request({
		url: url+"api/devices/"+id,
		headers: {
			"Authorization" : auth
		}
	},
	function (error, response, body) {
		res.send(body);
	});
};

exports.getRoomNodes = async (req,res) => {
	var roomID = req.params.roomID;
    var request = require('request'),
    url = process.env.FIB_URL,
    auth = process.env.FIB_AUTH;
	await request({
		url: url+"api/devices/",
		headers: {
			"Authorization" : auth
		}
	},
	function (error, response, body) {
		/*body = JSON.parse(body);
		for(var node in body){
			//node = JSON.parse(node);
			console.log(typeof node);
		}*/
		res.json(body);
	});
}


exports.getAll = async (req, res) => {
    console.log(process.env.FIB_URL);
    var request = require('request'),
    url = process.env.FIB_URL,
    auth = process.env.FIB_AUTH;
	await request({
		url: url+"api/devices/",
		headers: {
			"Authorization" : auth
		}
	},
	function (error, response, body) {
		res.send(body);
	});
};
