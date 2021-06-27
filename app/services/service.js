/**
 * @module       EmployeeService
 * @file         service.js
 * @description  EmployeeService class holds the callback method for controller 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        15/06/2021  
-----------------------------------------------------------------------------------------------*/
const model = require('../models/model')
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
                return callback("Incorrect Password", error)
            }else{
                const token = helper.createToken({loginData})
                return callback(null, token)
            }
        })
    }

    /**
     * @description sends the info to read in the controller
     * @method getAllDetails
     * @param callback callback for controller
    */
    getAllDetails = (callback) => {
        model.findAll((error, data) => {
            return (error) ? callback(error, null) : callback(null, data)
        })
    }

    /**
     * @description sends the info to readOne in the controller
     * @method getDetailsById
     * @param callback callback for controller
    */
    getDetailsById = (employee, callback) => {
        model.findOne(employee, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data)
        })
    }
    
    /**
     * @description sends the info to update in the controller
     * @method updateDetailsById
     * @param callback callback for controller
    */
    updateDetailsById = (employeeId, employee, callback) => {
        model.updateById(employeeId, employee, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data)
        })
    }
}

module.exports = new EmployeeService();