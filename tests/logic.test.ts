import { describe, it, expect } from "vitest";
import {
  findHueRange,
  _modifySaturationAttribute,
  _modifyHueAttribute,
  modifyHex,
} from "../src/core/domain/logic";
import { ModFactor } from "../src/core/domain/types";

describe("_modifyHueAttribute", () => {
  it("should return the original hue value when modFactor is 0", () => {
    const originalHue = 50;
    const minHue = 0;
    const maxHue = 360;
    const modFactor = 0;

    const result = _modifyHueAttribute(originalHue, minHue, maxHue, modFactor);

    const expected = 50;
    expect(result).toBe(expected);
  });

  it("should decrease the hue value when modFactor is negative", () => {
    const originalHue = 50;
    const minHue = 0;
    const maxHue = 360;
    const modFactor = -0.5;

    const result = _modifyHueAttribute(originalHue, minHue, maxHue, modFactor);

    const expected = 25;
    expect(result).toBe(expected);
  });

  it("should increase the hue value when modFactor is positive", () => {
    const originalHue = 50;
    const minHue = 0;
    const maxHue = 150;
    const modFactor = 0.5;

    const result = _modifyHueAttribute(originalHue, minHue, maxHue, modFactor);

    const expected = 100;
    expect(result).toBe(expected);
  });

  it("should handle counter clockwise hue circle wrapping", () => {
    const originalHue = 50;
    const minHue = 200;
    const maxHue = 100;
    const modFactor = -0.5;

    const result = _modifyHueAttribute(originalHue, minHue, maxHue, modFactor);
    const expected = 305;
    expect(result).toBe(expected);
  });
  it("should handle clockwise hue circle wrapping", () => {
    const originalHue = 300;
    const minHue = 200;
    const maxHue = 100;
    const modFactor = 0.5;

    const result = _modifyHueAttribute(originalHue, minHue, maxHue, modFactor);
    const expected = 20;
    expect(result).toBe(expected);
  });
});

describe("_modifySaturationAttribute", () => {
  it("should return the original saturation value when modFactor is 0", () => {
    const result = _modifySaturationAttribute(0.5, 0);
    expect(result).toBe(0.5);
  });

  it("should decrease the saturation value when modFactor is negative", () => {
    const result = _modifySaturationAttribute(0.5, -0.5);
    expect(result).toBe(0.25);
  });

  it("should increase the saturation value when modFactor is positive", () => {
    const result = _modifySaturationAttribute(0.5, 0.5);
    expect(result).toBe(0.75);
  });

  it("should throw an error when modFactor is not a number", () => {
    expect(() => _modifySaturationAttribute(0.5, NaN)).toThrow(Error);
  });
});

describe("modify hex function tests", () => {
  it("should give correct hex when huemod > 0", () => {
    const hex = "#284277";
    const minHue = 200;
    const maxHue = 240;
    const modFactor: ModFactor = { hueMod: 0.5, satMod: 0 };

    const result = modifyHex(hex, minHue, maxHue, modFactor);

    const expected = "#283577";

    expect(result).toEqual(expected);
  });
  it("should give correct hex when min hue is before 0, max hue after 0 and result hue is after 0", () => {
    const hex = "#773528";
    const minHue = 350;
    const maxHue = 30;
    const modFactor: ModFactor = { hueMod: 0.5, satMod: 0 };

    const result = modifyHex(hex, minHue, maxHue, modFactor);

    const expected = "#774228";

    expect(result).toEqual(expected);
  });
  it("should give correct hex when min hue is before 0, max hue after 0 and result hue is before 0", () => {
    const hex = "#773528";
    const minHue = 330;
    const maxHue = 50;
    const modFactor: ModFactor = { hueMod: -0.5, satMod: 0 };

    const result = modifyHex(hex, minHue, maxHue, modFactor);

    const expected = "#772835";

    expect(result).toEqual(expected);
  });
});

describe("findHueRange", () => {
  it("should calculate the correct hue range for central hue", () => {
    const centralHue = 50;
    const previousHue = 40;
    const nextHue = 60;
    const result = findHueRange(centralHue, previousHue, nextHue);
    expect(result.min).toBe(45);
    expect(result.max).toBe(55);
  });

  it("should handle the case where the central hue is at the start of the hue circle", () => {
    const centralHue = 0;
    const previousHue = 350;
    const nextHue = 10;
    const result = findHueRange(centralHue, previousHue, nextHue);
    expect(result.min).toBe(355);
    expect(result.max).toBe(5);
  });

  it("should handle the case where the central hue is at the end of the hue circle", () => {
    const centralHue = 360;
    const previousHue = 350;
    const nextHue = 10;
    const result = findHueRange(centralHue, previousHue, nextHue);
    expect(result.min).toBe(355);
    expect(result.max).toBe(5);
  });
});
