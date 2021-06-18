/**
 * @module       app
 * @file         routes.js
 * @description  app module contains api methods
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        15/06/2021  
-----------------------------------------------------------------------------------------------*/

const controller = require('../controllers/controller')

module.exports = (app) => {

    //api for registration
    app.post('/register', controller.registerApi);

    //api for login
    app.post('/login', controller.loginApi);
}