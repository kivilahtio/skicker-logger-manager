"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerManager_1 = require("../src/Skicker/LoggerManager");
const lm = new LoggerManager_1.LoggerManager(true);
describe("A suite is just a function", function () {
    var a;
    it("and so is a spec", function () {
        a = true;
        expect(a).toBe(true);
    });
    it("and so is a specarrrr", function () {
        a = true;
        expect(a).toBe(true);
    });
});
