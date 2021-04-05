const express = require("express");

const dotenv = require("dotenv");
dotenv.config();


//
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