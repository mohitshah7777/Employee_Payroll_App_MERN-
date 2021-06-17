/**
 * @module       EmployeeModel
 * @file         models.js
 * @description  EmpSchema holds the database Schema 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        15/06/2021  
-----------------------------------------------------------------------------------------------*/

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const EmpSchema = mongoose.Schema({
    firstName: {
        type: String,
        required : true      
    },
    lastName: {
        type: String,
        required : true      
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

EmpSchema.pre("save", async function(next){
    if(this.isModified("password")){
        // console.log(`current password is ${this.password}`)
        this.password = await bcrypt.hash(this.password, 8)
        // console.log(`current password is ${this.password}`);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 8)
        // console.log(`current confirm password is ${this.confirmpassword}`)
    }
    next();
})

const Register = mongoose.model('Register', EmpSchema)

class EmployeeModel {

    /**
     * @description register user in the database
     * @param employee 
     * @param callback 
     */
    createDetails = (employee, callback) => {
        const empSchema = new Register({
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            password: employee.password,
            confirmpassword: employee.confirmpassword
        });
        empSchema.save(callback)
    };
}

module.exports = new EmployeeModel();