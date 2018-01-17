"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4javascript = require("log4javascript");
/**
 * Logger wrapper for the awesome log4javascript.
 *
 * Deals with configuration of the given loggerName-loggers.
 *
 * @example <caption>Basic invocation</caption>
 * import {LoggerManager} from './Skicker/LoggerManager';
 * let loggerManager: LoggerManager = new LoggerManager(true);
 * letlogger = loggerManager.getLogger(); //Get the root-logger
 * logger.error("Logging sucks!");
 *
 * @example <caption>Configure a logger, inherits from root logger</caption>
 * loggerManager.setConfigurer("Skicker.Stepper", function(logger) {
 *   logger.setLevel(log4javascript.Level.ERROR);
 * });
 *
 * let logger = loggerManager.getLogger("Skicker.Stepper");
 * logger.error("Skicker.Stepper here logging errorly"); //Logged
 * logger.warn( "Skicker.Stepper here logging warning"); //Not logged
*/
class LoggerManager {
    constructor(injectRootLogger) {
        this.configurers = {};
        this.initedLoggers = {};
        this.initRootLogger();
        if (injectRootLogger) {
            this.injectRootLogger();
        }
    }
    /**
     * Initializes the root logger, so other instantiated loggers can inherit it's configuration
    */
    initRootLogger() {
        var log = this.getLogger();
        var appender = new log4javascript.BrowserConsoleAppender();
        // Change the desired configuration options
        appender.setThreshold(log4javascript.Level.ALL);
        // Define the log layout
        var layout = new log4javascript.PatternLayout("%d{HH:mm:ss}[%-5p]%c: %m");
        appender.setLayout(layout);
        // Add the appender to the logger
        log.addAppender(appender);
    }
    /**
     * Injects the root logger to window.logger so it can be played with from the developer console
    */
    injectRootLogger() {
        window.logger = this.getLogger();
        window.logger.info("root log4javascript.Logger injected to window.logger");
    }
    /**
     * @param loggerName The name/package of the logger to get and configure
     */
    getLogger(loggerName) {
        let logger;
        if (!loggerName) {
            logger = log4javascript.getRootLogger();
        }
        else {
            logger = log4javascript.getLogger(loggerName);
        }
        //If logger is named and we haven't initiated that logger yet, proceed to invoke the init function
        if (loggerName && !this.initedLoggers[loggerName]) {
            this.configurers[loggerName](logger);
        }
        return logger;
    }
    loadConfigurations(configJsonOrTxt) {
        let config;
        if (typeof configJsonOrTxt === 'string') {
            config = JSON.parse(configJsonOrTxt);
        }
    }
    /**
     * Set the configurer function for a single named Logger
     *
     * @param loggerName Name of the logger to configure, eg. 'Skicker.Steps.Player'
     * @param configurer Function with the log4javscript configuration steps needed, see [example]{@link http://log4javascript.org/docs/manual.html#configuration}
     */
    setConfigurer(loggerName, configurer) {
        this.configurers[loggerName] = configurer;
    }
}
exports.LoggerManager = LoggerManager;
