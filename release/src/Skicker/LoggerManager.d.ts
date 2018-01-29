import * as log4javascript from "log4javascript";
export { log4javascript };
export declare type LoggerConfigurer = (logger: log4javascript.Logger) => void;
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
export declare abstract class LoggerManager {
    /**
     * @param loggerName The name/package of the logger to get and configure. If nothing is given, returns the root logger.
     */
    static getLogger(loggerName?: string): log4javascript.Logger;
    /**
     * Initializes the underlying log4javascript. You must call this once, and only once before using loggers.
     *
     * @param injectRootLogger Inject the root logger to window.logger?
     */
    static init(injectRootLogger?: boolean): boolean;
    /** TODO
     * Loads configuration from the given log4j configuration text/string or a JSON-object
     *
     * @param configJson
     */
    static loadConfigurations(configJsonOrTxt: object | string): void;
    /**
     * Set the configurer function for a single named Logger
     *
     * @param loggerName Name of the logger to configure, eg. 'Skicker.Steps.Player'
     * @param configurer Function with the log4javscript configuration steps needed, see [example]{@link http://log4javascript.org/docs/manual.html#configuration}
     */
    static setConfigurer(loggerName: string, configurer: LoggerConfigurer): void;
    private static configurers;
    private static initedLoggers;
    /**
     * Initializes the root logger, so other instantiated loggers can inherit it's configuration
     */
    private static initRootLogger();
    /**
     * Injects the root logger to window.logger so it can be played with from the developer console
     */
    private static injectRootLogger();
}
