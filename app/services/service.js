/**
 * @module       EmployeeService
 * @file         service.js
 * @description  EmployeeService class holds the callback method for controller 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        15/06/2021  
-----------------------------------------------------------------------------------------------*/

const model = require('../models/model')

class EmployeeService {
    
    /**
     * @description Create and save employee then send response to controller
     * @method createDetails to save the employee
     * @param callback callback for controller
     */
    createDetails = (employee, callback) => {
        model.createDetails(employee, callback)
    }
}

module.exports = new EmployeeService();