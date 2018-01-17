import {Power2, TimelineLite, TweenMax} from "gsap";
import * as $ from "jquery";
import * as _ from "underscore";
import "./app.css";

import * as log4javascript from "log4javascript"; // Import log level constants
import {LoggerManager} from "./Skicker/LoggerManager";

const loggerManager: LoggerManager = new LoggerManager(true);
(window as any).logger = loggerManager.getLogger();
(window as any).logger.error("Logging sucks!");

loggerManager.setConfigurer("Skicker.Stepper", (logger) => {
  logger.setLevel(log4javascript.Level.ERROR);
});
const logger = loggerManager.getLogger("Skicker.Stepper");
logger.fatal("Skicker.Stepper here logging fatally");
logger.error("Skicker.Stepper here logging errorly");
logger.warn("Skicker.Stepper here logging warning");


$(() => {

  $(document.body).html("Hello World");

  const element = document.createElement("div");
  element.innerHTML = "Hello, webpack";
  element.classList.add("hello");
  document.body.appendChild(element);

  TweenMax.fromTo($("div.hello"), 30, {backgroundColor: "#eeee00"}, {backgroundColor: "#0000ee"});

  const template = _.template("<div class='<%- className %>'>Hello _underscore!</div>");
  template({className: "hello2"});
});
