import { describe, test, expect } from "vitest";
import {
  validateHexColorValue,
  validateHue,
  validateLuminosity,
  validateSaturation,
} from "../../src/core/validators";

describe("hex pattern validator", () => {
  test("hex code #fff should be valid", () => {
    expect(validateHexColorValue("#fff")).toBe(true);
  });

  test("hex code #ffffff should be valid", () => {
    expect(validateHexColorValue("#ffffff")).toBe(true);
  });

  test("hex code fff should be valid", () => {
    expect(validateHexColorValue("fff")).toBe(true);
  });

  test("hex code ffffff should be valid", () => {
    expect(validateHexColorValue("ffffff")).toBe(true);
  });

  test("hex code #123 should be valid", () => {
    expect(validateHexColorValue("#123")).toBe(true);
  });

  test("hex code #123456 should be valid", () => {
    expect(validateHexColorValue("#123456")).toBe(true);
  });

  test("hex code 123 should be valid", () => {
    expect(validateHexColorValue("123")).toBe(true);
  });

  test("hex code 123456 should be valid", () => {
    expect(validateHexColorValue("123456")).toBe(true);
  });

  test("hex code #abc should be valid", () => {
    expect(validateHexColorValue("#abc")).toBe(true);
  });

  test("hex code #abcdef should be valid", () => {
    expect(validateHexColorValue("#abcdef")).toBe(true);
  });

  test("hex code abc should be valid", () => {
    expect(validateHexColorValue("abc")).toBe(true);
  });

  test("hex code abcdef should be valid", () => {
    expect(validateHexColorValue("abcdef")).toBe(true);
  });

  test("hex code #abcd should be invalid", () => {
    expect(validateHexColorValue("#abcd")).toBe(false);
  });

  test("hex code #abcd12 should be valid", () => {
    expect(validateHexColorValue("#abcd12")).toBe(true);
  });

  test("hex code #abcd123 should be invalid", () => {
    expect(validateHexColorValue("#abcd123")).toBe(false);
  });

  test("hex code #1234 should be invalid", () => {
    expect(validateHexColorValue("#1234")).toBe(false);
  });

  test("hex code #12345 should be invalid", () => {
    expect(validateHexColorValue("#12345")).toBe(false);
  });

  test("hex code 1234 should be invalid", () => {
    expect(validateHexColorValue("1234")).toBe(false);
  });

  test("hex code 12345 should be invalid", () => {
    expect(validateHexColorValue("12345")).toBe(false);
  });

  test("hex code 1234567 should be invalid", () => {
    expect(validateHexColorValue("1234567")).toBe(false);
  });

  test("hex code #1234567 should be invalid", () => {
    expect(validateHexColorValue("#1234567")).toBe(false);
  });

  test("hex code with invalid characters #zzzzzz should be invalid", () => {
    expect(validateHexColorValue("#zzzzzz")).toBe(false);
  });

  test("hex code with invalid characters ggg should be invalid", () => {
    expect(validateHexColorValue("ggg")).toBe(false);
  });

  test("empty string should be invalid", () => {
    expect(validateHexColorValue("")).toBe(false);
  });
});

describe("validateLuminosity", () => {
  test("should return true for valid luminosity value 0", () => {
    expect(validateLuminosity(0)).toBe(true);
  });

  test("should return true for valid luminosity value 0.5", () => {
    expect(validateLuminosity(0.5)).toBe(true);
  });

  test("should return true for valid luminosity value 1", () => {
    expect(validateLuminosity(1)).toBe(true);
  });

  test("should return false for invalid luminosity value -0.1", () => {
    expect(validateLuminosity(-0.1)).toBe(false);
  });

  test("should return false for invalid luminosity value 1.1", () => {
    expect(validateLuminosity(1.1)).toBe(false);
  });

  test("should return false for invalid luminosity value 2", () => {
    expect(validateLuminosity(2)).toBe(false);
  });

  test("should return false for invalid luminosity value -1", () => {
    expect(validateLuminosity(-1)).toBe(false);
  });

  test("should return false for NaN value", () => {
    expect(validateLuminosity(NaN)).toBe(false);
  });

  test("should return false for Infinity value", () => {
    expect(validateLuminosity(Infinity)).toBe(false);
  });

  test("should return false for -Infinity value", () => {
    expect(validateLuminosity(-Infinity)).toBe(false);
  });
});

describe("validateSaturation", () => {
  test("should return true for valid saturation value 0", () => {
    expect(validateSaturation(0)).toBe(true);
  });

  test("should return true for valid saturation value 0.5", () => {
    expect(validateSaturation(0.5)).toBe(true);
  });

  test("should return true for valid saturation value 1", () => {
    expect(validateSaturation(1)).toBe(true);
  });

  test("should return false for saturation value less than 0", () => {
    expect(validateSaturation(-0.1)).toBe(false);
  });

  test("should return false for saturation value greater than 1", () => {
    expect(validateSaturation(1.1)).toBe(false);
  });

  test("should return false for saturation value 2", () => {
    expect(validateSaturation(2)).toBe(false);
  });

  test("should return false for saturation value -1", () => {
    expect(validateSaturation(-1)).toBe(false);
  });

  test("should return false for NaN", () => {
    expect(validateSaturation(NaN)).toBe(false);
  });

  test("should return false for Infinity", () => {
    expect(validateSaturation(Infinity)).toBe(false);
  });

  test("should return false for -Infinity", () => {
    expect(validateSaturation(-Infinity)).toBe(false);
  });
});

describe("validateHue", () => {
  test("returns true for hue within the valid range", () => {
    expect(validateHue(0)).toBe(true);
    expect(validateHue(180)).toBe(true);
    expect(validateHue(360)).toBe(true);
  });

  test("returns false for hue below the valid range", () => {
    expect(validateHue(-1)).toBe(false);
    expect(validateHue(-10)).toBe(false);
  });

  test("returns false for hue above the valid range", () => {
    expect(validateHue(361)).toBe(false);
    expect(validateHue(400)).toBe(false);
  });

  test("returns true for edge cases", () => {
    expect(validateHue(0)).toBe(true);
    expect(validateHue(360)).toBe(true);
  });

  test("returns false for non-integer values", () => {
    expect(validateHue(360.1)).toBe(false);
    expect(validateHue(-0.1)).toBe(false);
  });

  test("returns false for non-numeric values", () => {
    expect(validateHue(NaN)).toBe(false);
    expect(validateHue(Infinity)).toBe(false);
    expect(validateHue(-Infinity)).toBe(false);
  });
});
