import {Power2, TimelineLite, TweenMax} from "gsap";
import * as $ from "jquery";
import * as _ from "underscore";
import "./app.css";

import {log4javascript, LoggerManager} from "./Skicker/LoggerManager";

LoggerManager.init(true);
(window as any).logger = LoggerManager.getLogger();
(window as any).logger.error("Logging sucks!");

LoggerManager.setConfigurer("Skicker.Stepper", (logger) => {
  logger.setLevel(log4javascript.Level.ERROR);
});
const logger = LoggerManager.getLogger("Skicker.Stepper");
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
