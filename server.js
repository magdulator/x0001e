const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

//connect to database
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
console.log("Connected to database"));

var corsOptions = {
    origin: "http://localhost:5000"
  };
  
  app.use(cors(corsOptions));
  app.use(express.json());
  
  // parse requests of content-type - application/json
  app.use(bodyParser.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.json({ message: "Testytest" });
  });
  
  const router = require('./routes/routes.js');
  app.use('/api', router);

  const testRoute = require('./routes/test.js');
  app.use('/test', testRoute);

  const authRoute = require('./routes/auth');
  app.use('/api/users', authRoute);

  const imageRoute = require('./routes/images.js');
  app.use('/api/images', imageRoute);

  // set port, listen for requests
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });

  