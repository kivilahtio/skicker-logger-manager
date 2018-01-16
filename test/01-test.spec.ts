"use strict";

import bar from '../src/bar';

bar();

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

