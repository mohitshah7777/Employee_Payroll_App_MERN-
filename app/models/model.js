/**
 * @module       EmployeeModel
 * @file         models.js
 * @description  EmpSchema holds the database Schema 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        15/06/2021  
-----------------------------------------------------------------------------------------------*/
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const EmpSchema = mongoose.Schema({
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

EmpSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 8)
        this.confirmPassword = await bcrypt.hash(this.confirmPassword, 8)
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
            confirmPassword: employee.confirmPassword
        });
        empSchema.save(callback)
    };

    /**
     * @description login user from the database
     * @param loginData 
     * @param callback for service
     */
    loginDetails = (loginData, callBack) => {
        Register.findOne({'email': loginData.email},(error, data) => {
            if(error){
                return callBack(error, null);
            }else if(!data){
                return callBack("Invalid Credentials", null);
            }
            return callBack(null, data);
        })
    }
    /**
     * @description find all users from the database
     * @param findAll 
     * @param callback for service
     */
    
    findAll = (callBack) => {
        Register.find({}, (error, data) => {
            if(error){
                return callBack(error, null)
            }else{
                return callBack(null, data)
            }
        })
    }
}

module.exports = new EmployeeModel();