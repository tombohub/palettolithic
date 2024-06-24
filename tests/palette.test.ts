import { describe, it, expect } from "vitest";
import { hslFromHex } from "../src/core/domain/palette";
import { type HSL } from "../src/core/domain/types";

describe("testing hslFromHex function", () => {
  it("should convert hex code to correct hsl", () => {
    const hexCode = "#2a4675";
    const result = hslFromHex(hexCode);
    const expected: HSL = {
      hue: 217.6,
      saturation: 0.47169811320754707,
      luminosity: 0.31176470588235294,
    };

    expect(result).toEqual(expected);
  });
  it("shoudl throw Error on invalid hex", () => {
    const hex = "#zzz";

    expect(() => hslFromHex(hex)).toThrowError();
  });
});
