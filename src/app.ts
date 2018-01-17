import * as $ from 'jquery';
import {TweenMax, Power2, TimelineLite} from "gsap";
import './app.css';
import * as _ from 'underscore';

import * as log4javascript from 'log4javascript'; //Import log level constants
import {LoggerManager} from './Skicker/LoggerManager';

let loggerManager: LoggerManager = new LoggerManager(true);
(<any>window).logger = loggerManager.getLogger();
(<any>window).logger.error("Logging sucks!");

loggerManager.setConfigurer("Skicker.Stepper", function(logger) {
  logger.setLevel(log4javascript.Level.ERROR);
});
let logger = loggerManager.getLogger("Skicker.Stepper");
logger.fatal("Skicker.Stepper here logging fatally");
logger.error("Skicker.Stepper here logging errorly");
logger.warn("Skicker.Stepper here logging warning");



$(() => {

  $(document.body).html("Hello World");

  var element = document.createElement('div');
  element.innerHTML = 'Hello, webpack';
  element.classList.add('hello');
  document.body.appendChild(element);

  TweenMax.fromTo($("div.hello"), 30, {backgroundColor: "#eeee00"}, {backgroundColor: "#0000ee"});

  let template = _.template("<div class='<%- className %>'>Hello _underscore!</div>");
  template({className: 'hello2'});
});

