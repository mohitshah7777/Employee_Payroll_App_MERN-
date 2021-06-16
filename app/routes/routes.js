/**
 * @module       app
 * @file         routes.js
 * @description  app module contains api methods
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        15/06/2021  
-----------------------------------------------------------------------------------------------*/

const controller = require('../controllers/controller')

module.exports = (app) => {

    //create api for registration
    app.post('/employee', controller.createApi);
}