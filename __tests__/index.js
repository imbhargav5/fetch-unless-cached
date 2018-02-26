import fetchUnlessCached, { createfetchUnlessCached } from "../lib";

describe("fetchUnlessCached", () => {
  test("fetchUnlessCached is a function", () => {
    expect(typeof fetchUnlessCached).toBe("function");
  });
});

describe("createfetchUnlessCached", () => {
  test("createfetchUnlessCached is a function", () => {
    expect(typeof createfetchUnlessCached).toBe("function");
  });

  test("createfetchUnlessCached creates a function when invoked with no arguments", () => {
    expect(typeof createfetchUnlessCached()).toBe("function");
  });

  test("createfetchUnlessCached creates a function when invoked with 1 argument", () => {
    expect(typeof createfetchUnlessCached(300)).toBe("function");
  });
});
