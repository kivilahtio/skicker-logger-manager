"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4javascript = require("log4javascript");
exports.log4javascript = log4javascript;
/**
 * @singleton
 *
 * Logger wrapper for the awesome log4javascript.
 *
 * Deals with configuration of the given loggerName-loggers.
 *
 *
 *
 * @example <caption>Basic invocation</caption>
 * import {log4javascript, LoggerManager} from './Skicker/LoggerManager';
 * LoggerManager.init(true);
 * letlogger = LoggerManager.getLogger(); //Get the root-logger
 * logger.error("Logging sucks!");
 *
 * @example <caption>Configure a logger, inherits from root logger</caption>
 * LoggerManager.setConfigurer("Skicker.Stepper", function(logger) {
 *   logger.setLevel(log4javascript.Level.ERROR);
 * });
 *
 * let logger = LoggerManager.getLogger("Skicker.Stepper");
 * logger.error("Skicker.Stepper here logging errorly"); //Logged
 * logger.warn( "Skicker.Stepper here logging warning"); //Not logged
 */
// Not really abstract, but singleton. see. https://stackoverflow.com/questions/13212521/typescript-static-classes#13212648
class LoggerManager {
    /**
     * @param loggerName The name/package of the logger to get and configure. If nothing is given, returns the root logger.
     */
    static getLogger(loggerName) {
        let logger;
        if (!loggerName) {
            logger = log4javascript.getRootLogger();
        }
        else {
            logger = log4javascript.getLogger(loggerName);
        }
        // If logger is named and we haven't initiated that logger yet, proceed to invoke the init function
        if (loggerName && !this.initedLoggers[loggerName]) {
            if (this.configurers[loggerName]) {
                this.configurers[loggerName](logger);
            }
            // Having a configuration for a named logger is not mandatory. Then it simply inherits configuration from ancestors.
        }
        return logger;
    }
    /**
     * Initializes the underlying log4javascript. You must call this once, and only once before using loggers.
     *
     * @param injectRootLogger Inject the root logger to window.logger?
     */
    static init(injectRootLogger) {
        this.initRootLogger();
        if (injectRootLogger) {
            this.injectRootLogger();
        }
        return true;
    }
    /** TODO
     * Loads configuration from the given log4j configuration text/string or a JSON-object
     *
     * @param configJson
     */
    static loadConfigurations(configJsonOrTxt) {
        let config;
        if (typeof configJsonOrTxt === "string") {
            config = JSON.parse(configJsonOrTxt);
        }
    }
    /**
     * Set the configurer function for a single named Logger
     *
     * @param loggerName Name of the logger to configure, eg. 'Skicker.Steps.Player'
     * @param configurer Function with the log4javscript configuration steps needed, see [example]{@link http://log4javascript.org/docs/manual.html#configuration}
     */
    static setConfigurer(loggerName, configurer) {
        this.configurers[loggerName] = configurer;
    }
    /**
     * Initializes the root logger, so other instantiated loggers can inherit it's configuration
     */
    static initRootLogger() {
        const log = this.getLogger();
        const appender = new log4javascript.BrowserConsoleAppender();
        // Change the desired configuration options
        appender.setThreshold(log4javascript.Level.ALL);
        // Define the log layout
        const layout = new log4javascript.PatternLayout("%d{HH:mm:ss}[%-5p]%c: %m");
        appender.setLayout(layout);
        // Add the appender to the logger
        log.addAppender(appender);
    }
    /**
     * Injects the root logger to window.logger so it can be played with from the developer console
     */
    static injectRootLogger() {
        window.logger = this.getLogger();
        window.logger.info("root log4javascript.Logger injected to window.logger");
    }
}
LoggerManager.configurers = {};
LoggerManager.initedLoggers = {};
exports.LoggerManager = LoggerManager;
