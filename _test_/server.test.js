const request = require('supertest')
const app = require('../src/server/server');

describe('addtest', () => {
  it('basic test', async () => {

    let httpCode = 200;
    expect(httpCode).toEqual(200)
  })

  it("POST /add - success", async () => {
    console.log("Test Post"+app);
    let stateObj = {
      destination: "Paris",
      date: "19-Mar-2021",
    };
    let response = await request("http://localhost:8888").post("/add").send(stateObj);
    console.log(response.body.success);
    expect(response.body.success).toEqual(true);
  });

})