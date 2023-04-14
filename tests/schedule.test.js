const request = require("supertest");
const app = require("../app");
const cache = require("memory-cache");

describe("GET /schedule", () => {
  beforeEach(() => {
    // clear cache before each test
    cache.clear();
  });

  test("returns cached schedule if available", async () => {
    const trainTimeTable = [{ train: "A", time: "1000" }];
    cache.put("schedule", trainTimeTable, 60 * 1000);

    const response = await request(app).get("/schedule");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Full Schedule fetched successfully");
    expect(response.body.schedule).toEqual(trainTimeTable);
  });

  test("returns full schedule if not cached", async () => {
    const response = await request(app).get("/schedule");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Full Schedule fetched successfully");
    expect(response.body.schedule).toBeTruthy();
  });
});
