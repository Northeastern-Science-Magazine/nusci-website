import request from "supertest";
import app from "../../app.js";
import Connection from "../../../api/db/connection.js";

describe("approve user", () => {

  it("Approving user should result in 302 status code", async () => {
    const res = await request(app).post("/internal/approve-user").send({ name: "ethan" });

    expect(res.statusCode).toEqual(302);
    await Connection.close();
  });

  /*
  it("Approving user should result in 302 status code", async () => {
    const res = await request(app).post("/internal/approve-user").send({ name: "raisa" });

    expect(res.statusCode).toEqual(302);
    await Connection.close();
  });
  */

});

/*
describe("approve user2", () => {

  it("Approving user should result in 302 status code", async () => {
    const res = await request(app).post("/internal/approve-user").send({ name: "raisa" });

    expect(res.statusCode).toEqual(302);
  });

  afterAll(async () => {
    await Connection.close();
  });
});
*/