const express = require("express");
require('./config/database.config');

// Create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// parse requests of content-type - application/json
app.use(express.json());

const PORT = process.env.PORT || 4000;

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

module.exports = app;