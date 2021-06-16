/**
 * @module       EmployeeController
 * @file         controller.js
 * @description  EmployeeController class holds the Api methods for routing 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        15/06/2021  
-----------------------------------------------------------------------------------------------*/

const service = require('../services/service');

class EmployeeController{

    /**
     * @description Create and save employee and sending response to service
     * @method createApi to save the employee
     * @param req,res for service
     */
    createApi = (req, res) => {
        // Validate request
        if(!req.body.email) {
            return res.status(400).send({
                message: "Email must be unique"
            });
        }

        // Create an employee
        const employee = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmpassword: req.body.confirmpassword
        }

        const empdata ={}
        
        service.createDetails(employee, (error,data) => {
            if(error){
                return res.status(500)
                .send({message: error.message || "Error occurred while registering the employee" })
            }
            else{
                return res.status(200)
                .send({message: "Success", data: empdata.data = data})
            }
        })
    }
}

module.exports = new EmployeeController();