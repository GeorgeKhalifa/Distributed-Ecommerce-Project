const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app')

test('Should show route error (users)', async () => {
    await request(app).post('/register').send({
        name: 'Andrew',
        email: 'andrew@example.com',
        password: 'MyPass777!',
        password2:'MyPass777!'
    }).expect(404)
    
    mongoose.disconnect()
})

//302 FOUND
test('Should signin', async()=>{
    await request(app).post('/users/login').send({
        email:'test@test',
        password:'123456'
    }).expect(302) 
    mongoose.disconnect()
})

test('Deposite Cash', async()=>{
    await request(app).post('/deposit_cash').send({
       cash:300,
    }).expect(302) 
    mongoose.disconnect()
})


//GET
//200 succeeded 
test('Go to Welcome',async()=>{
    await request(app).get('/').expect(200)
    mongoose.disconnect();
})


test('Go to My-account',async()=>{
    await request(app).get('/my-account').expect(302)
    mongoose.disconnect();
})


test('Add product', async()=>{
    await request(app).get('/add_product').expect(302) 
    
    mongoose.disconnect()
})


test('GO to shop', async()=>{
    await request(app).get('/shop').expect(302) 
    
    mongoose.disconnect()
})

test('GO to Cart', async()=>{
    await request(app).get('/cart').expect(302) 
    
    mongoose.disconnect()
})

test('GO to Deposite Cash', async()=>{
    await request(app).get('/deposit_cash').expect(302) 
    
    mongoose.disconnect()
})

test('GO to Order', async()=>{
    await request(app).get('/order').expect(302) 
    
    mongoose.disconnect()
})

test('GO to history', async()=>{
    await request(app).get('/history').expect(302) 
    
    mongoose.disconnect()
})

