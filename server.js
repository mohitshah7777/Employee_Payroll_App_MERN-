const dbConfig = require('./config/database.config');

const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");

// Create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
// parse requests of content-type - application/json
app.use(express.json());


const CONNECTION_URL =  dbConfig.url;
const PORT = process.env.PORT || 4000;

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { console.log("Successfully connected to the database"); })
    .catch(err => { console.log('Could not connect to the database. Exiting now...', err);
                    process.exit();
    });

// define a simple route    
app.get('/',(req,res) => {
    res.json({"message": "Welcome to Employee Payroll App"})
})

// Require Employee routes
require('./app/routes/routes')(app);

// listen for requests
app.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
});