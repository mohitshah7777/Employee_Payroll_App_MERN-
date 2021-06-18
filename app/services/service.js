/**
 * @module       EmployeeService
 * @file         service.js
 * @description  EmployeeService class holds the callback method for controller 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        15/06/2021  
-----------------------------------------------------------------------------------------------*/

const model = require('../models/model')
const bcrypt = require('bcryptjs')

class EmployeeService {
    /**
     * @description Create and save employee then send response to controller
     * @method createDetails to save the employee
     * @param callback callback for controller
     */
    createDetails = (employee, callback) => {
        model.createDetails(employee, (error, data) => {
            return error ? callback(error, null) : callback(null, data)
        })
    }

    /**
     * @description sends the info to loginApi in the controller
     * @method loginDetails
     * @param callback callback for controller
     */
    loginDetails = (loginData, callback) => {
        model.loginDetails(loginData, (error, data) => {
            return error ? callback(error, null) : callback(null, data)
        })
    }
}

module.exports = new EmployeeService();