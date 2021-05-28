const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const widefind = require('./controllers/widefind');


const dotenv = require("dotenv");
dotenv.config();

const app = express();
// app.enable('trust proxy')
// app.use((req, res, next) => {
//     req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
// })
//connect to database
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
console.log("Connected to database"));  

  app.use(cors());
  //app.use(express.json());
  
  // parse requests of content-type - application/json
  app.use(bodyParser.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.json({ message: "Testytest" });
  });
  
  const routes = require('./routes/routes.js');
  app.use('/api', routes);

  const systems = require('./routes/systems.js');
  app.use('/api/systems', systems);

  const authRoute = require('./routes/auth');
  app.use('/api/users', authRoute);

  const imageRoute = require('./routes/images');
  app.use('/api/images', imageRoute, express.static('uploads'));

  // set port, listen for requests
  const PORT = process.env.PORT || 5000;
  let server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });

  //MAYBE USE SOCKETS
   let io = require('socket.io')(server, {
     cors : {
       origin: 'http://localhost:3000',
       methods: ["GET", "POST"]     }
   });

   io.on('connection', function(socket){
      socket.on('widefind', (data) => {
        widefind.wide(socket);
     });
  });
 
