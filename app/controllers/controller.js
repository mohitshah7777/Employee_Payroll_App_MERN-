/**
 * @module       EmployeeController
 * @file         controller.js
 * @description  EmployeeController class holds the Api methods for routing 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        15/06/2021  
-----------------------------------------------------------------------------------------------*/

const Joi = require('joi');
const service = require('../services/service');

// joi validation
const validateSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
    confirmpassword: Joi.string().valid(Joi.ref('password')).required()
}) 

class EmployeeController{

    /**
     * @description Create and save employee and sending response to service
     * @method createApi to save the employee
     * @param req,res for service
     */
    createApi = (req, res) => {

        // Create an employee
        const employee = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmpassword: req.body.confirmpassword
        }

        const empdata ={}
        
        // Validate request
        const validation = validateSchema.validate(employee)
        if(validation.error){
            res.status(400).send('Validation Error')
        }

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