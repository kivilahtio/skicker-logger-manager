import * as log4javascript from "log4javascript";
export declare type LoggerConfigurer = (logger: log4javascript.Logger) => void;
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
export declare class LoggerManager {
    private configurers;
    private initedLoggers;
    constructor(injectRootLogger?: boolean);
    /**
     * @param loggerName The name/package of the logger to get and configure
     */
    getLogger(loggerName?: string): log4javascript.Logger;
    /** TODO
     * Loads configuration from the given log4j configuration text/string or a JSON-object
     *
     * @param configJson
     */
    loadConfigurations(configJsonOrTxt: object | string): void;
    /**
     * Set the configurer function for a single named Logger
     *
     * @param loggerName Name of the logger to configure, eg. 'Skicker.Steps.Player'
     * @param configurer Function with the log4javscript configuration steps needed, see [example]{@link http://log4javascript.org/docs/manual.html#configuration}
     */
    setConfigurer(loggerName: string, configurer: LoggerConfigurer): void;
    /**
     * Initializes the root logger, so other instantiated loggers can inherit it's configuration
     */
    private initRootLogger();
    /**
     * Injects the root logger to window.logger so it can be played with from the developer console
     */
    private injectRootLogger();
}
