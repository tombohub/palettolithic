import { describe, it, expect } from "vitest";
import { makeHue } from "../../../src/core/domain/hue";

describe("makeHue", () => {
  it("should return a Hue type for valid hue values", () => {
    const validHue = 120;
    expect(makeHue(validHue)).toBe(validHue);
  });

  it("should throw an error for invalid hue values", () => {
    const invalidHue = -1;
    expect(() => makeHue(invalidHue)).toThrow();
  });

  it("should throw an error for hue values greater than 360", () => {
    const largeHue = 361;
    expect(() => makeHue(largeHue)).toThrow();
  });
});
