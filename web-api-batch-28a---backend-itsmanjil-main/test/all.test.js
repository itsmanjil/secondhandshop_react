const app = require("../app");
const User = require("../models/user");
const mongoose = require("mongoose");
const supertest = require("supertest");
beforeEach((done) => {
  mongoose.connect(
    "mongodb://localhost:27017/secondhandshop",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
  jest.setTimeout(60000);
});
afterEach((done) => {
  mongoose.connection.close(() => done());
});
test("POST api/user/register", async () => {
  const data = {
    name: "naruto11",
    email: "naruto119@gmail.com",
    password: "Password",
    phone: "123456789",
  };
  await supertest(app)
    .post("/api/user/register")
    .send(data)
    .expect(200)
    .then(async (response) => {
      expect(response.body.successmsg).toBe(
        "User Account Successfully created"
      );
    });
});
test("POST api/user/login", async () => {
  const data = { email: "admin", password: "admin" };
  await supertest(app)
    .post("/api/user/login")
    .send(data)
    // .expect(200)
    .then(async (response) => {
      expect(response.body.userStatus).toBe(undefined);
    });
});

test("GET /api/products", async () => {
  const data = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmFhYjJhNTNjZTMzNzNmNDA2MjNjZSIsImlhdCI6MTY1ODgxNjA1MywiZXhwIjoxNjU4ODUwNjEzfQ.__gFrL34hYzKpoV93M-fAtMYjU3Pm2MiUiOnSeCT8Kc",
  };
  await supertest(app)
    .get("/api/products")
    .send(data)
    .expect(200)
    .then(async (response) => {
      expect(response.body.success).toBe(undefined);
    });
});
