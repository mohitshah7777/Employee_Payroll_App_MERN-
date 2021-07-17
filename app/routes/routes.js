/**
 * @module       app
 * @file         routes.js
 * @description  app module contains api methods
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        15/06/2021  
-----------------------------------------------------------------------------------------------*/
const user = require('../controllers/user');
const employee = require('../controllers/employee');
const helper = require('../middleware/helper');

module.exports = (app) => {
    
    //api for registration
    app.post('/register', user.register);

    //api for login
    app.post('/login', user.login);

    //api for registration
    app.post('/create', helper.tokenChecker ,employee.createEmployee);

    //api for read
    app.get('/read', helper.tokenChecker ,employee.read);

    //api for read by id
    app.get('/read/:_id', helper.tokenChecker ,employee.readOne);

    //api for update by id
    app.put('/update/:_id',helper.tokenChecker , employee.update);
    
    //api for delete by id
    app.delete('/delete/:_id',helper.tokenChecker , employee.delete);
}