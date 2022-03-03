const request = require('supertest')
const app = require('../src/app')

// beforeEach(async()=>{
//     //await User.deleteMany()
// })

test('testing sync',()=>{
    expect(2+2).toBe(4)
})

test('testing async', async ()=>{
    await request(app)
        .post('/settings/mcu')
        .send()
        .expect(200)
})