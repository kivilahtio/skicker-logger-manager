import * as log4javascript from "log4javascript"; // Import log level constants
import { LoggerManager } from "../../src/Skicker/LoggerManager";

const logger = LoggerManager.getLogger("TestClass");

export class TestClass {

  public constructor() {
    logger.info("TestClass constructor with params []");

    logger.info("TestClass constructed");
  }

  public testMethod(ageIsJustA: number): number {
    logger.info(`ageIsJustA: number = '${ageIsJustA}'`);
    return ageIsJustA;
  }
}
