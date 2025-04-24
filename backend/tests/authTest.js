const { supertest, app } = require("./testSetup");

describe("Auth Routes", () => {
  it("should register a new user", async () => {
    const response = await supertest(app)
      .post("/auth/register")
      .send({ username: "testuser", email: "test@example.com", password: "Password123" });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });

  it("should log in a user", async () => {
    const response = await supertest(app)
      .post("/auth/login")
      .send({ email: "test@example.com", password: "Password123" });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});