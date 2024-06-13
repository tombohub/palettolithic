import { describe, it, expect } from "vitest";
import { findHueRange } from "../../src/core/domain/logic";

describe("findHueRange", () => {
  it("should calculate the correct hue range for central hue", () => {
    const centralHue = 50;
    const previousHue = 40;
    const nextHue = 60;
    const result = findHueRange(centralHue, previousHue, nextHue);
    expect(result.min).toBeCloseTo(45);
    expect(result.max).toBeCloseTo(55);
  });

  it("should handle the case where the central hue is at the start of the hue circle", () => {
    const centralHue = 0;
    const previousHue = 350;
    const nextHue = 10;
    const result = findHueRange(centralHue, previousHue, nextHue);
    expect(result.min).toBeCloseTo(355);
    expect(result.max).toBeCloseTo(5);
  });

  it("should handle the case where the central hue is at the end of the hue circle", () => {
    const centralHue = 360;
    const previousHue = 350;
    const nextHue = 10;
    const result = findHueRange(centralHue, previousHue, nextHue);
    expect(result.min).toBeCloseTo(355);
    expect(result.max).toBeCloseTo(5);
  });
});
