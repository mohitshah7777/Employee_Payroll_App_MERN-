/**
 * @module       EmployeeController
 * @file         controller.js
 * @description  EmployeeController class holds the Api methods for routing 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        15/06/2021  
-----------------------------------------------------------------------------------------------*/
const service = require('../services/user');
const validateSchema = require('../middleware/userValidation');

class EmployeeController{
    /**
     * @description Create and save employee and sending response to service
     * @method register to save the employee
     * @param req,res for service
     */
    register = (req, res) => {
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
                .send({success:false, message: "Email already exists", data: null})
            }
            else{
                return res.status(200)
                .send({success: true, message: "Employee has been successfully registered", data: empdata.data = data})
            }
        })
    }

    /**
     * @description retrieving login info from user by email and password
     * @method login
     * @param req,res for service
     */
    login = (req, res) => {
        const loginData = {
            email: req.body.email,
            password : req.body.password
        }
        service.loginDetails(loginData, (error, token) => {
            if(error){
                return res.status(400).send({success: false, message: error, token: null})
            }
            else{
                return res.status(200).send({success: true, message: "Successfully Logged In", token: token})
            }
        })
    }
}

module.exports = new EmployeeController();