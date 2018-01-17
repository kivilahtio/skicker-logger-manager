"use strict";

import {LoggerManager} from "../src/Skicker/LoggerManager";

const lm: LoggerManager = new LoggerManager(true);

describe("A suite is just a function", function() {
  var a;

  it("and so is a spec", function() {
    a = true;

    expect(a).toBe(true);
  });

  it("and so is a specarrrr", function() {
    a = true;

    expect(a).toBe(true);
  });
});

