import {log4javascript, LoggerManager} from "../src/Skicker/LoggerManager";

describe("LoggerManager initializes,", () => {

  describe("Initialize,", () => {
    it("Initialize LoggerManager", () => {
      expect(LoggerManager.init(false)).toBe(true);
    });
    it("Root Logger not in window.logger", () => {
      expect((window as any).logger).toEqual(undefined);
    });
  });

  describe("Initialize and inject root logger to window,", () => {
    it("Initialize LoggerManager", () => {
      expect(LoggerManager.init(true)).toBe(true);
    });
    it("Root Logger in window.logger", () => {
      expect(typeof (window as any).logger).toEqual("object"); // jasmine.any(log4javascript.Logger) doesn't work because of a missing constructor function.
    });
  });

  describe("window.logger logging with different log levels,", () => {

    beforeAll(() => {
      LoggerManager.init(true);
      // "callAppenders" is a private method, so we need to do type casting to access it illegally.
      spyOn((window as any).logger as any, "callAppenders").and.callThrough();
    });

    it("window.logger logs a fatal message", () => {
      (window as any).logger.fatal("THIS IS THE END!");

      const loggingEvent: log4javascript.LoggingEvent = ((window as any).logger as any).callAppenders.calls.argsFor(0)[0];
      expect(loggingEvent.level).toEqual(log4javascript.Level.FATAL);
      expect(loggingEvent.messages.toString()).toEqual("THIS IS THE END!");
    });

    it("window.logger omits logging a trace message", () => {
      (window as any).logger.trace("This is not the end...");

      const logEntriesAppendedCount: number = ((window as any).logger as any).callAppenders.calls.count();
      expect(logEntriesAppendedCount).toEqual(1); // log4javascript appenders invoked only once, on the previous successful logging event
    });
  });

  describe("TestClass package logger logging with different log levels,", () => {

    let loggerTest: log4javascript.Logger;
    beforeAll(() => {
      LoggerManager.init(true);
      LoggerManager.setConfigurer("TestClass", (logger) => {
        logger.setLevel(log4javascript.Level.INFO);
      });
      loggerTest = LoggerManager.getLogger("TestClass");
      // "callAppenders" is a private method, so we need to do type casting to access it illegally.
      spyOn(loggerTest as any, "callAppenders").and.callThrough();
    });

    it("TestClass logger logs a info message", () => {
      loggerTest = LoggerManager.getLogger("TestClass");
      loggerTest.info("This is informative!");

      const loggingEvent: log4javascript.LoggingEvent = (loggerTest as any).callAppenders.calls.argsFor(0)[0];
      expect(loggingEvent.level).toEqual(log4javascript.Level.INFO);
      expect(loggingEvent.messages.toString()).toEqual("This is informative!");
    });

    it("TestClass logger omits logging a debug message", () => {
      loggerTest = LoggerManager.getLogger("TestClass");
      loggerTest.debug("This could be debuggish, now simply sluggish");

      const logEntriesAppendedCount: number = (loggerTest as any).callAppenders.calls.count();
      expect(logEntriesAppendedCount).toEqual(1); // log4javascript appenders invoked only once, on the previous successful logging event
    });
  });
});
