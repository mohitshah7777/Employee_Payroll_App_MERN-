/**
 * @module       EmployeeService
 * @file         service.js
 * @description  EmployeeService class holds the callback method for controller 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        15/06/2021  
-----------------------------------------------------------------------------------------------*/
const model = require('../models/employee')

class CreateEmployeeService {
    /**
     * @description Create and save employee then send response to controller
     * @method createDetails to save the employee
     * @param callback callback for controller
     */
    createEmployee = (employee, callback) => {
        model.createEmployee(employee, (error, data) => {
            return error ? callback(error, null) : callback(null, data)
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

    /**
     * @description sends the info to delete in the controller
     * @method deleteDetailsById
     * @param callback callback for controller
    */
     deleteDetailsById = (employeeId, callback) => {
        model.deleteById(employeeId, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data)
        })
    }
}

module.exports = new CreateEmployeeService();
