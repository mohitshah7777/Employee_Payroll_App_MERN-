/**
 * @file         database.config.js
 * @description  Connection details for database 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        15/06/2021  
-----------------------------------------------------------------------------------------------*/

const mongoose = require("mongoose");

const CONNECTION_URL = 'mongodb://localhost:27017/employee-payroll-app'

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("Successfully connected to the database"); })
    .catch(err => { console.log('Could not connect to the database. Exiting now...', err);
                    process.exit();
    });