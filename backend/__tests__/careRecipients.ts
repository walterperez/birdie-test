import app from "../src/application";
import * as request from "supertest";

describe("Testing Care Recipient Controller", () => {
  it("greetings", async () => {
    await request(app)
      .get("/careRecipients")
      .expect(200)
      .expect(function(res) {
        expect(res.body.greetings).toContain("careRecipients goes here");
      });
  });
});
