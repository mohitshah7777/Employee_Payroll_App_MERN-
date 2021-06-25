const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
chai.should()
chai.use(chaiHttp)

describe('Tests api', () => {
    /* 
    POST API test 
    */
    describe('POST /login', () => {
        it("It should post login details", (done) => {
            const loginData = {
                email: "testtoken@gmail.com",
                password: "Token@123"
            }
            chai.request(server)
                .post("/login")
                .send(loginData)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Successfully Logged In")
                    res.body.should.have.property("token");
                    done()
            })
        }) 
    })
})