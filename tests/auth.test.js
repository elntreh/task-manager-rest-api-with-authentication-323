import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import app from "../src/app.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/taskmanager_test";

beforeAll(async () => {
  await mongoose.connect(MONGO_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Auth Routes", () => {
  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Test User", email: `auth_${Date.now()}@example.com`, password: "123456" });
    expect(res.statusCode).toBe(201);
  });

  it("should login user and return token", async () => {
    const email = `login_${Date.now()}@example.com`;
    await request(app).post("/api/auth/register")
      .send({ name: "Login User", email, password: "123456" });
    const res = await request(app).post("/api/auth/login")
      .send({ email, password: "123456" });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
