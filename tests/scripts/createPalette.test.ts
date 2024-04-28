import { expect, test, describe } from "vitest";
import { type ColorHueRange } from "../../src/core/domain";
import {
  adjustLighntess,
  createLightness,
  hueToColorName,
} from "../../src/core/palette";

export const testColorHueRanges: ColorHueRange[] = [
  { colorName: "red", min: 0, max: 30 },
  { colorName: "orange", min: 30, max: 60 },
  { colorName: "yellow", min: 60, max: 90 },
  { colorName: "lime", min: 90, max: 120 },
  { colorName: "green", min: 120, max: 150 },
  { colorName: "teal", min: 150, max: 180 },
  { colorName: "cyan", min: 180, max: 210 },
  { colorName: "blue", min: 210, max: 240 },
  { colorName: "indigo", min: 240, max: 270 },
  { colorName: "violet", min: 270, max: 300 },
  { colorName: "purple", min: 300, max: 330 },
  { colorName: "pink", min: 330, max: 360 },
  { colorName: "red", min: 360, max: 360 },
];

// Testing hueToColorName
describe("hueToColorName function", () => {
  test("hue 29 should be color red", () => {
    expect(hueToColorName(29, testColorHueRanges)).toBe("red");
  });
  test("hue 30 should be color orange", () => {
    expect(hueToColorName(30, testColorHueRanges)).toBe("orange");
  });
  test("hue 0 should be color red", () => {
    expect(hueToColorName(0, testColorHueRanges)).toBe("red");
  });
});

// Testing createLightness
describe("createLightness function", () => {
  test("shade 50 gives 0.95 lightness", () => {
    expect(createLightness(50)).toBe(0.95);
  });
});

// Testing adjustLighntess
describe("adjustLighntess function", () => {
  test("hex value 4D7CFF should give 0036cc for new lightness 0.4", () => {
    expect(adjustLighntess("4D7CFF", 0.4)).toBe("#0036cc");
  });
});
