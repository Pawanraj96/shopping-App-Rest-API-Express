const request = require('supertest')
const app = require('../app.js')        // here we are testing app.js file 

// Register endpoint tesing

describe("POST/user/register", () => {
    test('OK Register is working', async () => {            // first parameter is string we can give anything second is asynchronous callback func.
        const res = await request(app)          //in request we are having supertest
            .post('/user/register')             //which method you used for register use that
            .set('Accept', 'application/json')
            .send({
                "fname": "pawan",
                "lname": "raj",
                "email": "pawan1@gmail.com",
                "password": "pawan123",
                "role": "admin"
            })
        expect(res.statusCode).toBe(200)
    }, 20000)
})

//Login

describe('POST/user/login', () => {
    test('OK login works', async () => {
        const res = await request(app)
            .post('/user/login')
            .set('Accept', 'application/json')
            .send({                                     //we use send method to send data in body
                "email": "pawan1@gmail.com",
                "password": "pawan123",
            })
        expect(res.statusCode).toEqual(200)
    }, 20000)
})

//Products/Products end point

describe('GET/products/products', () => {
    let token = null;
    beforeEach((done) => {                 //this is nothing but before testing we are logging in
        request(app)
            .post('/user/login')
            .send({
                "email": "pawan1@gmail.com",
                "password": "pawan123",
            })
            .end((req, res) => {
                token = res.body.data.token
                done()
            })
    })
    test('Ok Products getting', async () => {
        const res = await request(app)
            .get('/products/products')
            .set('Authorization', 'Bearer' + token)        // we use set method to send data in header
        expect(res.statusCode).toEqual(200)
    }, 20000)
})