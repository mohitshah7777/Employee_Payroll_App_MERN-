/**
 * @module       Helper
 * @file         helper.js
 * @description  Helper class holds the jwt token data 
 * @author       Mohit Shah <mohitshah7777@gmail.com>
 * @since        21/06/2021  
-----------------------------------------------------------------------------------------------*/
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

class Helper{

    /**
     * @description function to create a token for authentication of user
     * @param {*} loginData
     * @returns 
     */
    createToken(loginData){
        return jwt.sign(loginData, process.env.SECRET_TOKEN, {
            expiresIn: "2000s"
        })
    }

    /**
     * @description function compares with user password and bcrypted password stored in database
     * @param {*} loginPassword 
     * @param {*} databasePassword
     * @returns 
     */
    bcryptAuthentication = (loginPassword, databasePassword) => {
        return (loginPassword && databasePassword) ? (!bcrypt.compareSync(loginPassword, databasePassword)) : false;
    }
    
    /**
     * @description function checks and validates the user token and authorises only if token is correct
     * @param {*} req
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    tokenChecker(req, res, next) {
        let token = req.get('token');
        return (token) ?
            jwt.verify(token, SECRET_TOKEN, error => {
                return (error) ? res.status(400).send({message: "Invalid Token"}) : next();
            }) :
        res.status(401).send({message: "Token missing! Invalid user"});
    }
}

module.exports = new Helper();