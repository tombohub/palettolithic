import { expect, test } from "vitest";
import {
  adjustLighntess,
  createLightness,
  hueToColorName,
} from "../../src/scripts/createPalette";

test("hue 29 should be color red", () => {
  expect(hueToColorName(29)).toBe("red");
});
test("hue 30 should be color orange", () => {
  expect(hueToColorName(30)).toBe("orange");
});
test("hue 0 should be color red", () => {
  expect(hueToColorName(0)).toBe("red");
});

test("shade 50 gives 0.95 lightness", () => {
  expect(createLightness(50)).toBe(0.95);
});

test("hex value 4D7CFF should give 0036cc for new lighntess 0.4", () => {
  expect(adjustLighntess("4D7CFF", 0.4)).toBe("#0036cc");
});
