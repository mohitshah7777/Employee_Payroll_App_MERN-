/**
 * @module       EmployeeController
 * @file         controller.js
 * @description  EmployeeController class holds the Api methods for routing 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        15/06/2021  
-----------------------------------------------------------------------------------------------*/
const service = require('../services/service');
const validateSchema = require('../middleware/validation');
const bcrypt = require('bcryptjs')

class EmployeeController{
    /**
     * @description Create and save employee and sending response to service
     * @method registerApi to save the employee
     * @param req,res for service
     */
    registerApi = (req, res) => {
        // Validate request
        const validation = validateSchema.validate(req.body)
        if(validation.error){
            res.status(400).send({message: validation.error.details[0].message})
        }

        // Create an employee
        const employee = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        }

        const empdata ={}
        
        service.createDetails(employee, (error,data) => {
            if(error){
                return res.status(400)
                .send({message: "Email already exists"})
            }
            else{
                return res.status(200)
                .send({message: "Success! Employee has been Registered", data: empdata.data = data})
            }
        })
    }

    /**
     * @description retrieving login info from user by email and password
     * @method loginApi
     * @param req,res for service
     */
    loginApi = (req, res) => {
        const loginData = {
            email: req.body.email,
            password : req.body.password
        }

        service.loginDetails(loginData, (error, data) => {
            if(error){
                return res.status(400).send({message: error})
            }if(bcrypt.compare(loginData.password, data.password)){
                return res.status(400).send({message:'Incorrect Password'})
            }
            else{
                return res.status(200).send({message: "Success! Logged In", data: data})
            }
        })
    }
}

module.exports = new EmployeeController();