import { describe, it, expect } from "vitest";
import { makeHex } from "../../../src/core/domain/hex";

describe("makeHex", () => {
  it("should return a Hex type for valid hex color values", () => {
    const validHex = "#FFFFFF";
    expect(makeHex(validHex)).toBe(validHex);
  });

  it("should throw an error for invalid hex color values", () => {
    const invalidHex = "#GGGGGG";
    expect(() => makeHex(invalidHex)).toThrow();
  });

  it("should throw an error for incorrect lenght ", () => {
    const longHex = "#FFFFFFF";
    const shortHex = "#FF";
    expect(() => makeHex(longHex)).toThrow();
    expect(() => makeHex(shortHex)).toThrow();
  });
});
