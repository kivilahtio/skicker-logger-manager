"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerManager_1 = require("../../src/Skicker/LoggerManager");
const logger = LoggerManager_1.LoggerManager.getLogger("TestClass");
class TestClass {
    constructor() {
        logger.info("TestClass constructor with params []");
        logger.info("TestClass constructed");
    }
    testMethod(ageIsJustA) {
        logger.info(`ageIsJustA: number = '${ageIsJustA}'`);
        return ageIsJustA;
    }
}
exports.TestClass = TestClass;
