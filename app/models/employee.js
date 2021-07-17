/**
 * @module       CreateEmployee
 * @file         employee.js
 * @description  CreateEmpSchema holds the database Schema 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        15/06/2021  
-----------------------------------------------------------------------------------------------*/
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CreateEmpSchema = mongoose.Schema({
    firstName: {
        type: String,
        required : true ,
        validate: /^[a-zA-Z]{2,20}/     
    },
    lastName: {
        type: String,
        required : true,
        validate: /^[a-zA-Z]{2,20}/      
    },
    email: {
        type: String,
        required: true,
        validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

CreateEmpSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 8)
        this.confirmPassword = await bcrypt.hash(this.confirmPassword, 8)
    }
    next();
})

const Employee = mongoose.model('Employee', CreateEmpSchema)

class CreateEmployeeModel {
    /**
     * @description register user in the database
     * @param employee 
     * @param callback 
     */
    createEmployee = (employee, callback) => {
        const createSchema = new Employee({
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            department: employee.department,
            salary: employee.salary,
            password: employee.password,
            confirmPassword: employee.confirmPassword
        });
        createSchema.save(callback)
    };

    /**
     * @description find all users from the database
     * @param findAll 
     * @param callback for service
     */
    findAll = (callBack) => {
        Employee.find({}, (error, data) => {
            if(error){
                return callBack(error, null)
            }else{
                return callBack(null, data)
            }
        })
    }  

    /**
     * @description find user by id from the database
     * @param findOne
     * @param callback for service
     */
    findOne = (employee, callBack) => {
        Employee.findById({'_id': employee._id}, (error, data) => {
            if(error){
                return callBack(error, null)
            }else {
                 return callBack(null, data)
            }
        })
    }

    /**
     * @description find user by id and update in the database
     * @param updateById
     * @param callback for service
     */
    updateById = (_id, employee, callBack) => {
        Employee.findByIdAndUpdate({'_id': employee._id}, {
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            department: employee.department,
            salary: employee.salary,
            password: employee.password,
            confirmPassword: employee.confirmPassword
        }, (error, data) => {
            if(error){
                return callBack(error, null)
            }else {
                return callBack(null, data)
            }
        })
    }

    /**
     * @description find user by id and delete in the database
     * @param deleteById
     * @param callback for service
     */
    deleteById = (employee, callBack) => {
        Employee.findByIdAndRemove(employee._id, (error, data) => {
            if(error){
                return callBack(error, null)
            }else{
                return callBack(null, data)
            }   
        })
    }
}

module.exports = new CreateEmployeeModel();