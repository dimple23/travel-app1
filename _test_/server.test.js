require('regenerator-runtime/runtime')
test('Testing the server', async () => {
    const app = await require('../src/server/server.js')
    //const res = await request(app)
    expect(app).toBeDefined()
})