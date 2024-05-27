import { expect, test, describe } from "vitest";
import { colorHueRanges } from "../../src/core/domain/domain";
import {
  modifyLuminosity,
  createLightness,
  hueToColorName,
  modifySaturation,
} from "../../src/core/palette";

// Testing hueToColorName
describe("hueToColorName function", () => {
  test("hue 29 should be color red", () => {
    expect(hueToColorName(29, colorHueRanges)).toBe("red");
  });
  test("hue 30 should be color orange", () => {
    expect(hueToColorName(30, colorHueRanges)).toBe("orange");
  });
  test("hue 0 should be color red", () => {
    expect(hueToColorName(0, colorHueRanges)).toBe("red");
  });
});

// Testing createLightness
describe("createLightness function", () => {
  test("shade 50 gives 0.95 lightness", () => {
    expect(createLightness(50)).toBe(0.95);
  });
});

describe("applying new luminosity to hex color", () => {
  test("hex value 4D7CFF should give 0036cc for new lightness 0.4", () => {
    expect(modifyLuminosity("4D7CFF", 0.4)).toBe("#0036cc");
  });
  test("should throw an error when lightness is greater than 1", () => {
    expect(() => modifyLuminosity("4D7CFF", 1.1)).toThrow();
  });
  test("should throw an error when lightness is less than 0", () => {
    expect(() => modifyLuminosity("4D7CFF", -0.5)).toThrow();
  });
});

// test saturation modify
describe("modify saturation", () => {
  test("should modify saturation of #ff5733 to 0.5", () => {
    const modifiedHex = modifySaturation("#ff5733", 0.5);
    expect(modifiedHex).toBe("#cc7866");
  });

  test("should modify saturation of #000000 (black) to any value (still black)", () => {
    const hex = "#000000";
    const newSaturation = 0.5;
    const modifiedHex = modifySaturation(hex, newSaturation);
    expect(modifiedHex).toBe("#000000");
  });

  test("should modify saturation of #ffffff (white) to any value (still white)", () => {
    const hex = "#ffffff";
    const newSaturation = 0.5;
    const modifiedHex = modifySaturation(hex, newSaturation);
    expect(modifiedHex).toBe("#ffffff");
  });

  test("should modify saturation of #123456 to 0 (gray scale)", () => {
    const modifiedHex = modifySaturation("#385573", 0);
    expect(modifiedHex).toBe("#565656");
  });

  test("should modify saturation of #385573 to 1 (full saturation)", () => {
    const modifiedHex = modifySaturation("#385573", 1);
    expect(modifiedHex).toBe("#0054ab");
  });

  test("should throw an error for invalid hex code", () => {
    const invalidHex = "invalid-hex";
    const newSaturation = 0.5;
    expect(() => modifySaturation(invalidHex, newSaturation)).toThrow();
  });

  test("should throw an error for invalid saturation value", () => {
    const hex = "#ff5733";
    const invalidSaturation = 2;
    expect(() => modifySaturation(hex, invalidSaturation)).toThrow();
  });
});
