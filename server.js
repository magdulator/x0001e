const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
  };
  
  app.use(cors(corsOptions));
  
  // parse requests of content-type - application/json
  app.use(bodyParser.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.json({ message: "Testytest" });
  });
  
  const router = require('./routes/routes.js');
  app.use('/api', router)


  // set port, listen for requests
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });

  