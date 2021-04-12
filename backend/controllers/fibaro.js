const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

//route to endpoint is defined in routes/routes.js and server.js

//Get info from a specific node
const getNode = async (req,res) => {
	var id = req.params.id;
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

const getRoomNodes = async (req,res) => {
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

const getAll = async (req, res) => {
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
module.exports = {
    getNode, getAll, getRoomNodes
}