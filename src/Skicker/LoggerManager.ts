"use strict";

import * as log4javascript from 'log4javascript';

export type LoggerConfigurer = (logger:log4javascript.Logger) => void;

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
export class LoggerManager {

  configurers: {[loggerName:string] : LoggerConfigurer} = {};
  initedLoggers: {[loggerName:string] : Date} = {};

  constructor();
  constructor(injectRootLogger: Boolean);
  constructor(injectRootLogger?: Boolean) {
    this.initRootLogger();
    if (injectRootLogger) { this.injectRootLogger() }
  }

  /**
   * Initializes the root logger, so other instantiated loggers can inherit it's configuration
  */
  private initRootLogger() : void {
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
  private injectRootLogger() : void {
    (<any>window).logger = this.getLogger();
    (<any>window).logger.info("root log4javascript.Logger injected to window.logger");
  }

  /**
   * @param loggerName The name/package of the logger to get and configure
   */
  public getLogger(loggerName?: string) : log4javascript.Logger {
    let logger:log4javascript.Logger;
    if (!loggerName) { logger = log4javascript.getRootLogger(); }
    else             { logger = log4javascript.getLogger(loggerName); }
  
    //If logger is named and we haven't initiated that logger yet, proceed to invoke the init function
    if (loggerName && ! this.initedLoggers[loggerName]) {
      this.configurers[loggerName](logger);
    }

    return logger;
  }

  /** TODO
   * Loads configuration from the given log4j configuration text/string or a JSON-object
   * 
   * @param configJson 
   */
  public loadConfigurations(configJson: Object) : void;
  public loadConfigurations(configTxt: string) : void;
  public loadConfigurations(configJsonOrTxt: Object|string) : void {
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
  public setConfigurer(loggerName:string, configurer:LoggerConfigurer) : void {
    this.configurers[loggerName] = configurer;
  }
}
