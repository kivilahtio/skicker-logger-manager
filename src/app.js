"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const $ = require("jquery");
const gsap_1 = require("gsap");
//import './style.css';
const _ = require("underscore");
const log4javascript = require("log4javascript"); //Import log level constants
const LoggerManager_1 = require("./Skicker/LoggerManager");
let loggerManager = new LoggerManager_1.LoggerManager(true);
window.logger = loggerManager.getLogger();
window.logger.error("Logging sucks!");
loggerManager.setConfigurer("Skicker.Stepper", function (logger) {
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
    gsap_1.TweenMax.fromTo($("div.hello"), 30, { backgroundColor: "#eeee00" }, { backgroundColor: "#0000ee" });
    let template = _.template("<div class='<%- className %>'>Hello _underscore!</div>");
    template({ className: 'hello2' });
});
//# sourceMappingURL=app.js.map