import { describe, expect, it } from "vitest";
import {
  _addHues,
  _calculateClockwiseMidpoint,
  _createHuesMidpoints,
  createHueRanges,
  _createHueRangesFromMidpoints,
  _subtractHues,
} from "../../src/core/utils";

describe("subtractCircleDegrees", () => {
  it("should return correct result for basic subtraction within range", () => {
    expect(_subtractHues(50, 20)).toBe(30);
    expect(_subtractHues(180, 90)).toBe(90);
    expect(_subtractHues(359, 1)).toBe(358);
  });

  it("should handle subtraction with wrap-around correctly", () => {
    expect(_subtractHues(10, 20)).toBe(350);
    expect(_subtractHues(0, 180)).toBe(180);
    expect(_subtractHues(1, 359)).toBe(2);
    expect(_subtractHues(10, 350)).toBe(20);
  });

  it("should return 0 when subtracting the same number", () => {
    expect(_subtractHues(0, 0)).toBe(0);
    expect(_subtractHues(180, 180)).toBe(0);
    expect(_subtractHues(359, 359)).toBe(0);
    expect(_subtractHues(360, 360)).toBe(0);
  });

  it("should handle edge cases", () => {
    expect(_subtractHues(0, 1)).toBe(359);
    expect(_subtractHues(1, 0)).toBe(1);
    expect(_subtractHues(360, 0)).toBe(0); // Note: 360 % 360 is 0
    expect(_subtractHues(360, 360)).toBe(0); // Note: 360 % 360 is 0
  });
});

describe("addAngles", () => {
  it("should add two angles correctly without wrapping", () => {
    expect(_addHues(30, 40)).toBe(70);
    expect(_addHues(0, 90)).toBe(90);
    expect(_addHues(180, 180)).toBe(0);
  });

  it("should add two angles correctly with wrapping", () => {
    expect(_addHues(350, 20)).toBe(10);
    expect(_addHues(270, 180)).toBe(90);
    expect(_addHues(359, 2)).toBe(1);
  });

  it("should handle edge cases", () => {
    expect(_addHues(0, 0)).toBe(0);
    expect(_addHues(0, 360)).toBe(0);
    expect(_addHues(360, 0)).toBe(0);
    expect(_addHues(360, 360)).toBe(0);
    expect(_addHues(359, 1)).toBe(0);
  });
});

describe("calculateClockwiseMidpoint", () => {
  it("should calculate the correct clockwise midpoint", () => {
    expect(_calculateClockwiseMidpoint(50, 30)).toBe(220);
    expect(_calculateClockwiseMidpoint(30, 50)).toBe(40);
    expect(_calculateClockwiseMidpoint(0, 180)).toBe(90);
    expect(_calculateClockwiseMidpoint(275, 25)).toBe(330);
  });

  it("should handle wrap-around correctly", () => {
    expect(_calculateClockwiseMidpoint(350, 10)).toBe(0); // Midpoint between 350 and 10 clockwise
    expect(_calculateClockwiseMidpoint(10, 350)).toBe(180); // Midpoint between 10 and 350 clockwise
  });

  it("should handle identical start and end degrees correctly", () => {
    expect(_calculateClockwiseMidpoint(0, 0)).toBe(0);
    expect(_calculateClockwiseMidpoint(180, 180)).toBe(180);
    expect(_calculateClockwiseMidpoint(359, 359)).toBe(359);
  });

  it("should handle edge cases correctly", () => {
    expect(_calculateClockwiseMidpoint(0, 359)).toBe(179.5); // Midpoint between 0 and 359 clockwise
    expect(_calculateClockwiseMidpoint(359, 0)).toBe(359.5); // Midpoint between 359 and 0 clockwise
    expect(_calculateClockwiseMidpoint(1, 360)).toBe(180.5); // Midpoint between 1 and 360 (which is 0)
  });
});

describe("createAnglesMidpoints", () => {
  it("should calculate midpoints for a simple set of angles", () => {
    const angles = [10, 50, 170];
    const expectedMidpoints = [270, 30, 110]; // Midpoints calculated manually

    expect(_createHuesMidpoints(angles)).toEqual(expectedMidpoints);
  });

  it("should calculate midpoints for a set of angles with wrap-around", () => {
    const angles = [350, 10, 50];
    const expectedMidpoints = [0, 30, 200]; // Midpoints calculated manually

    expect(_createHuesMidpoints(angles)).toEqual(expectedMidpoints);
  });

  it("should handle a single angle correctly", () => {
    const angles = [100];
    const expectedMidpoints = [100]; // Only one angle, the midpoint is the angle itself

    expect(_createHuesMidpoints(angles)).toEqual(expectedMidpoints);
  });

  it("should handle two angles correctly", () => {
    const angles = [90, 270];
    const expectedMidpoints = [0, 180]; // Midpoints calculated manually

    expect(_createHuesMidpoints(angles)).toEqual(expectedMidpoints);
  });
  it("should return empty array", () => {
    const angles = [];
    const expectedMidpoints = []; // Midpoints calculated manually

    expect(_createHuesMidpoints(angles)).toEqual(expectedMidpoints);
  });
});

describe("createRangesFromMidpoints", () => {
  it("should create ranges for a simple set of midpoints", () => {
    const midpoints = [30, 70, 110];
    const expectedRanges = [
      [30, 70],
      [70, 110],
      [110, 30],
    ];

    expect(_createHueRangesFromMidpoints(midpoints)).toEqual(expectedRanges);
  });

  it("should handle a single midpoint correctly", () => {
    const midpoints = [90];
    const expectedRanges = [[90, 90]];

    expect(_createHueRangesFromMidpoints(midpoints)).toEqual(expectedRanges);
  });

  it("should handle two midpoints correctly", () => {
    const midpoints = [0, 180];
    const expectedRanges = [
      [0, 180],
      [180, 0],
    ];

    expect(_createHueRangesFromMidpoints(midpoints)).toEqual(expectedRanges);
  });

  it("should return an empty array when given an empty array of midpoints", () => {
    const midpoints: number[] = [];
    const expectedRanges: number[][] = [];

    expect(_createHueRangesFromMidpoints(midpoints)).toEqual(expectedRanges);
  });

  it("should handle midpoints with wrap-around correctly", () => {
    const midpoints = [350, 10, 50];
    const expectedRanges = [
      [350, 10],
      [10, 50],
      [50, 350],
    ];

    expect(_createHueRangesFromMidpoints(midpoints)).toEqual(expectedRanges);
  });
});

describe("createAnglesRanges", () => {
  it("should create ranges for a simple set of angles", () => {
    const angles = [30, 70, 110];
    const expectedRanges = [
      [250, 50],
      [50, 90],
      [90, 250],
    ];
    expect(createHueRanges(angles)).toEqual(expectedRanges);
  });

  it("should handle a single angle correctly", () => {
    const angles = [90];
    const expectedRanges = [[90, 90]];
    expect(createHueRanges(angles)).toEqual(expectedRanges);
  });

  it("should handle two angles correctly", () => {
    const angles = [0, 180];
    const expectedRanges = [
      [270, 90],
      [90, 270],
    ];
    expect(createHueRanges(angles)).toEqual(expectedRanges);
  });

  it("should return an empty array when given an empty array of angles", () => {
    const angles: number[] = [];
    const expectedRanges: number[][] = [];
    expect(createHueRanges(angles)).toEqual(expectedRanges);
  });

  it("should handle angles with wrap-around correctly", () => {
    const angles = [350, 10, 50];
    const expectedRanges = [
      [0, 30],
      [30, 200],
      [200, 0],
    ];
    expect(createHueRanges(angles)).toEqual(expectedRanges);
  });
});
