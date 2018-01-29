"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerManager_1 = require("../src/Skicker/LoggerManager");
describe("LoggerManager initializes,", () => {
    describe("Initialize,", () => {
        it("Initialize LoggerManager", () => {
            expect(LoggerManager_1.LoggerManager.init(false)).toBe(true);
        });
        it("Root Logger not in window.logger", () => {
            expect(window.logger).toEqual(undefined);
        });
    });
    describe("Initialize and inject root logger to window,", () => {
        it("Initialize LoggerManager", () => {
            expect(LoggerManager_1.LoggerManager.init(true)).toBe(true);
        });
        it("Root Logger in window.logger", () => {
            expect(typeof window.logger).toEqual("object"); // jasmine.any(log4javascript.Logger) doesn't work because of a missing constructor function.
        });
    });
    describe("window.logger logging with different log levels,", () => {
        beforeAll(() => {
            LoggerManager_1.LoggerManager.init(true);
            // "callAppenders" is a private method, so we need to do type casting to access it illegally.
            spyOn(window.logger, "callAppenders").and.callThrough();
        });
        it("window.logger logs a fatal message", () => {
            window.logger.fatal("THIS IS THE END!");
            const loggingEvent = window.logger.callAppenders.calls.argsFor(0)[0];
            expect(loggingEvent.level).toEqual(LoggerManager_1.log4javascript.Level.FATAL);
            expect(loggingEvent.messages.toString()).toEqual("THIS IS THE END!");
        });
        it("window.logger omits logging a trace message", () => {
            window.logger.trace("This is not the end...");
            const logEntriesAppendedCount = window.logger.callAppenders.calls.count();
            expect(logEntriesAppendedCount).toEqual(1); // log4javascript appenders invoked only once, on the previous successful logging event
        });
    });
    describe("TestClass package logger logging with different log levels,", () => {
        let loggerTest;
        beforeAll(() => {
            LoggerManager_1.LoggerManager.init(true);
            LoggerManager_1.LoggerManager.setConfigurer("TestClass", (logger) => {
                logger.setLevel(LoggerManager_1.log4javascript.Level.INFO);
            });
            loggerTest = LoggerManager_1.LoggerManager.getLogger("TestClass");
            // "callAppenders" is a private method, so we need to do type casting to access it illegally.
            spyOn(loggerTest, "callAppenders").and.callThrough();
        });
        it("TestClass logger logs a info message", () => {
            loggerTest = LoggerManager_1.LoggerManager.getLogger("TestClass");
            loggerTest.info("This is informative!");
            const loggingEvent = loggerTest.callAppenders.calls.argsFor(0)[0];
            expect(loggingEvent.level).toEqual(LoggerManager_1.log4javascript.Level.INFO);
            expect(loggingEvent.messages.toString()).toEqual("This is informative!");
        });
        it("TestClass logger omits logging a debug message", () => {
            loggerTest = LoggerManager_1.LoggerManager.getLogger("TestClass");
            loggerTest.debug("This could be debuggish, now simply sluggish");
            const logEntriesAppendedCount = loggerTest.callAppenders.calls.count();
            expect(logEntriesAppendedCount).toEqual(1); // log4javascript appenders invoked only once, on the previous successful logging event
        });
    });
});
