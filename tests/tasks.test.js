import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import app from "../src/app.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/taskmanager_test";

let token;

beforeAll(async () => {
  await mongoose.connect(MONGO_URI);
  const email = `tasks_${Date.now()}@example.com`;
  await request(app).post("/api/auth/register")
    .send({ name: "Task User", email, password: "123456" });
  const res = await request(app).post("/api/auth/login")
    .send({ email, password: "123456" });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Task Routes", () => {
  it("should not allow access without token", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(401);
  });

  it("should create a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Task", description: "Testing" });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Task");
  });

  it("should get user tasks only", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
