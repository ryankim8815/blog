const app = require("./src/app");
const assert = require("assert");
const should = require("should");
const supertest = require("supertest");
const { request } = require("http");
// import app from "./src/app";
// import assert from "assert";
// import should from "should";
// import supertest from "supertest";
// https://www.youtube.com/watch?v=CL1tojcZx5I
describe("GET /users", () => {
  it("first test", (done) => {
    // assert.equal(1, 1);  // 가독성 문제로 should 사용
    (1).should.equal(1);

    done();
  });
});
describe("GET /users", () => {
  it("first test", (done) => {
    // assert.equal(1, 1);  // 가독성 문제로 should 사용
    (1).should.equal(1);
    request(app)
      .get("/u/list")
      .end((err, res) => {
        // Q. 응답값이 배열인가?
        res.body.should.be.instenceOf(Array);
        // Q. 배열에 특정 키가 있는가?
        // res.
      });

    done();
  });
});

// import app from "./src/app";
// import "dotenv/config";
// require("dotenv").config();

// // const PORT = process.env.SERVER_PORT || 5000;
// const PORT: string = process.env.SERVER_PORT;

// app
//   .listen(PORT, () => {
//     console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
//   })
//   .on("error", (err: string) => console.log(err));
