import * as scrollTools from "./scroll-checker.js";

const originalHeight = 4;
describe("scrollTools.getIsScrolledTooFar", () => {
  test("scrolled too far", () => {
    expect(
      scrollTools.getIsScrolledTooFar({
        originalWindowHeight: originalHeight,
        scrollPosition: scrollTools.maxAllowedScrollRatio * originalHeight + 1,
      }),
    ).toBe(true);
  });
  test("not scrolled too far", () => {
    expect(
      scrollTools.getIsScrolledTooFar({
        originalWindowHeight: originalHeight,
        scrollPosition: scrollTools.maxAllowedScrollRatio * originalHeight - 1,
      }),
    ).toBe(false);
  });

  test("string input throw an exception", () => {
    const originalHeight = 4;
    expect(() =>
      scrollTools.getIsScrolledTooFar({
        originalWindowHeight: originalHeight,
        scrollPosition: "bad input",
      }),
    ).toThrow();
  });
  test("bad inputs throw an exception", () => {
    expect(() =>
      scrollTools.getIsScrolledTooFar({
        originalWindowHeight: 4,
        scrollPosition: undefined,
      }),
    ).toThrow();
  });
});
