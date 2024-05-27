import { describe, it, expect } from "vitest";
import { hueFromHex } from "../../src/core/palette";

// Ensure chroma is imported in the test file as well
describe("hueFromHex", () => {
  it("should extract the correct hue value from hex code", () => {
    expect(hueFromHex("#ff0000")).toBeCloseTo(0); // Red
    expect(hueFromHex("#00ff00")).toBeCloseTo(120); // Green
    expect(hueFromHex("#0000ff")).toBeCloseTo(240); // Blue
  });

  it("should handle different hex formats correctly", () => {
    expect(hueFromHex("#FF0000")).toBeCloseTo(0); // Red, uppercase hex
    expect(hueFromHex("#00FF00")).toBeCloseTo(120); // Green, uppercase hex
    expect(hueFromHex("#0000FF")).toBeCloseTo(240); // Blue, uppercase hex
    expect(hueFromHex("#f00")).toBeCloseTo(0); // Red, shorthand hex
    expect(hueFromHex("#0f0")).toBeCloseTo(120); // Green, shorthand hex
    expect(hueFromHex("#00f")).toBeCloseTo(240); // Blue, shorthand hex
  });

  it("should handle invalid hex codes gracefully", () => {
    expect(() => hueFromHex("invalid")).toThrow();
    expect(() => hueFromHex("#12345")).toThrow();
    expect(() => hueFromHex("#xyz")).toThrow();
  });

  it("should handle edge case colors", () => {
    expect(hueFromHex("#ffffff")).toBeNaN(); // White, no hue
    expect(hueFromHex("#000000")).toBeNaN(); // Black, no hue
    expect(hueFromHex("#808080")).toBeNaN(); // Gray, no hue
  });
});
