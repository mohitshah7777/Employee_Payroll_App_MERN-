/**
 * @module       EmployeeController
 * @file         controller.js
 * @description  EmployeeController class holds the Api methods for routing 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        15/06/2021  
-----------------------------------------------------------------------------------------------*/
const service = require('../services/service');
const validateSchema = require('../middleware/validation');

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

    /**
     * @description retrieving all user data
     * @method read
     * @param req,res for service
    */
    read = (req, res) => {
        service.getAllDetails((error, data) => {
            if(error){
                return res.status(400).send({success: false, message : "Error while fetching information", data: null})
            }else{
                return res.status(200).send({success: true, message: "All Employee details fetched", data: data})
            }
        })
    }

    /**
     * @description retrieving user data by Id
     * @method readOne
     * @param req,res for service
    */
    readOne = (req, res) => {
        var employeeId = req.params
        service.getDetailsById(employeeId,(error, data) => {
            if(error || data == null){
                return res.status(404).send({success: false, message: "Error! Not Found", data: null})
            }else{
                return res.status(200).send({success: true, message: "Particular Employee details fetched", data: data})
            }
        })
    }
    
    /**
     * @description updating user data using Id
     * @method update
     * @param req,res for service
    */
    update = (req, res) => {
        const validation = validateSchema.validate(req.body)
        if(validation.error){
            res.status(400).send({message: validation.error.details[0].message})
        }
        
        const employee = {
            _id: req.params._id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.password
        } 

        var employeeId = req.params

        service.updateDetailsById(employeeId, employee,(error, data) => {
            if(error){
                return res.status(404).send({success: false, message: "Error! Not Found", data: null})
            }else{
                return res.status(200).send({success: true, message: "Employee details updated successfully", data: data})
            }
        })
    }

    /**
     * @description deleting user data using Id
     * @method delete
     * @param req,res for service
    */
    delete = (req, res) => {
        var employee = req.params
        service.deleteDetailsById(employee, (error, data) => {
            if(error || data == null){
                return res.status(404).send({success: false, message: "Employee not found", data: null})
            }else{
                return res.status(200).send({success: true, message: "Employee details deleted successfully!", data: data})
            }
        })
    }
}

module.exports = new EmployeeController();