"use strict";

import * as log4javascript from "log4javascript";

// Export the version of log4javascript used by this module. If you import log4javascript from the module using this logger,
// it can import a different version of log4javascript. This is because npm tracks module dependencies by the external module, not by the whole app.
export { log4javascript };

export type LoggerConfigurer = (logger: log4javascript.Logger) => void;

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
export abstract class LoggerManager {

  /**
   * @param loggerName The name/package of the logger to get and configure. If nothing is given, returns the root logger.
   */
  public static getLogger(loggerName?: string): log4javascript.Logger {
    // If there is an instance of a global LoggerManager, use that instead
    if ((window as any).loggerManager === this) {
      // This is the global logger manager
      let logger: log4javascript.Logger;
      if (!loggerName) {
        logger = log4javascript.getRootLogger();
      } else {
        logger = log4javascript.getLogger(loggerName);
      }

      // If logger is named and we haven't initiated that logger yet, proceed to invoke the init function
      if (loggerName && ! this.initedLoggers[loggerName]) {
        if (this.configurers[loggerName]) {
          this.configurers[loggerName](logger);
        }
        // Having a configuration for a named logger is not mandatory. Then it simply inherits configuration from ancestors.
      }

      return logger;
    } else {

      // Recurse to invoke the globally initialized LoggerManager instead
      return (window as any).loggerManager.getLogger(loggerName);
    }
  }

  /**
   * Initializes the underlying log4javascript. You must call this once, and only once before using loggers.
   *
   * @param injectRootLogger Inject the root logger to window.logger?
   */
  public static init(): boolean {
    this.injectLoggerManager();
    this.initRootLogger();
    return true;
  }

  /** TODO
   * Loads configuration from the given log4j configuration text/string or a JSON-object
   *
   * @param configJson
   */
  public static loadConfigurations(configJsonOrTxt: object|string): void {
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
  public static setConfigurer(loggerName: string, configurer: LoggerConfigurer): void {
    this.configurers[loggerName] = configurer;
  }

  private static configurers: {[loggerName: string]: LoggerConfigurer} = {};
  private static initedLoggers: {[loggerName: string]: Date} = {};

  /**
   * Initializes the root logger, so other instantiated loggers can inherit it's configuration
   */
  private static initRootLogger(): void {
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
   * Injects the LoggerManager to window.loggerManager so it can be shared between multiple libraries using the same LoggerManager
   */
  private static injectLoggerManager(): void {
    (window as any).loggerManager = this;
  }
}
