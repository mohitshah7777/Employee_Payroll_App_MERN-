const chai = require('chai')
const chaiHttp = require('chai-http')
const { object } = require('joi')
const server = require('../server')
const employeeData = require('./data.json')
chai.should()
chai.use(chaiHttp)

describe('Tests api', () => {
    /* 
    POST API test for login
    */
    describe('POST /login', () => {
        it("It should post login details", (done) => {
            const loginData = employeeData.login
            chai.request(server)
                .post("/login")
                .send(loginData)
                .end((error, res) => {
                    // console.log(res);
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Successfully Logged In")
                    res.body.should.have.property("token");
                done()
            })
        }) 
    })
    
    /* 
    POST API test for registeration
    */
    describe('POST /register', () => {
        it("It should post register details", (done) => {
            const registerData = {
                firstName: "Testone",
                lastName: "Cases",
                email: "testregis@gmail.com",
                password: "Token@1234",
                confirmPassword: "Token@1234"
            }
            chai.request(server)
                .post("/register")
                .send(registerData)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Employee has been successfully registered")
                    res.body.should.have.property("data").should.be.a('object');    
                done()
            })
        }) 
    })
})