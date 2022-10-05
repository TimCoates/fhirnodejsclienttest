var undertest = require("./patientretrieve");
//import * as axios from "axios";
// Mock out all top level functions, such as get, put, delete and post:
//jest.mock("axios");


describe("Testing patientretrieve.js", () => {

	describe("Testing router(resultID, callback)", () => {

		test("get Happy path", (done) => {
			const req = {};
			undertest.get(req, jest.fn());
			done();
		});

	});
});