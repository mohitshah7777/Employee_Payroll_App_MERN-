/**
 * @module       EmployeeService
 * @file         service.js
 * @description  EmployeeService class holds the callback method for controller 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        15/06/2021  
-----------------------------------------------------------------------------------------------*/
const model = require('../models/user')
const helper = require('../middleware/helper')

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
            if(error){
                return callback(error, null)
            }if(helper.bcryptAuthentication(loginData.password, data.password)){
                const token = helper.createToken({loginData})
                return (token) ? callback(null, token) : callback(error, null)
            }
            return callback("Incorrect Password", null)    
        })
    }
}

module.exports = new EmployeeService();
