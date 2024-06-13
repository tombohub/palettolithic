import { describe, test, expect, it } from "vitest";
import {
  type FlattenedColorScale,
  type WithHue,
  flatten,
  filterByWeight,
  addHue,
  validateAllWeightsAreEqual,
  sortByHue,
  validateIsSortedByHue,
  addAdjancentHues,
  addHueRanges,
} from "../../src/core/domain/transformations";
import { ColorScale } from "../../src/core/domain/types";

describe("flatten function", () => {
  test("should return an empty array when input is empty", () => {
    const input: ColorScale[] = [];
    const output: FlattenedColorScale[] = [];
    expect(flatten(input)).toEqual(output);
  });

  test("should return an array with one FlattenedColorScale object when input contains one ColorScale object with one shade", () => {
    const input: ColorScale[] = [
      { colorName: "red", shades: [{ hexCode: "#ff0000", weight: 1 }] },
    ];
    const output: FlattenedColorScale[] = [
      { colorName: "red", hexCode: "#ff0000", weight: 1 },
    ];
    expect(flatten(input)).toEqual(output);
  });

  test("should return an array with multiple FlattenedColorScale objects when input contains one ColorScale object with multiple shades", () => {
    const input: ColorScale[] = [
      {
        colorName: "red",
        shades: [
          { hexCode: "#ff0000", weight: 1 },
          { hexCode: "#ff7f7f", weight: 0.5 },
        ],
      },
    ];
    const output: FlattenedColorScale[] = [
      { colorName: "red", hexCode: "#ff0000", weight: 1 },
      { colorName: "red", hexCode: "#ff7f7f", weight: 0.5 },
    ];
    expect(flatten(input)).toEqual(output);
  });

  test("should return an array with FlattenedColorScale objects corresponding to each shade of each ColorScale object when input contains multiple ColorScale objects with multiple shades", () => {
    const input: ColorScale[] = [
      {
        colorName: "red",
        shades: [
          { hexCode: "#ff0000", weight: 1 },
          { hexCode: "#ff7f7f", weight: 0.5 },
        ],
      },
      {
        colorName: "blue",
        shades: [
          { hexCode: "#0000ff", weight: 1 },
          { hexCode: "#7f7fff", weight: 0.5 },
        ],
      },
    ];
    const output: FlattenedColorScale[] = [
      { colorName: "red", hexCode: "#ff0000", weight: 1 },
      { colorName: "red", hexCode: "#ff7f7f", weight: 0.5 },
      { colorName: "blue", hexCode: "#0000ff", weight: 1 },
      { colorName: "blue", hexCode: "#7f7fff", weight: 0.5 },
    ];
    expect(flatten(input)).toEqual(output);
  });
});

describe("filterByWeight function", () => {
  test("should return an empty array when input is empty", () => {
    const input: FlattenedColorScale[] = [];
    const output: FlattenedColorScale[] = [];
    expect(filterByWeight(input, 1)).toEqual(output);
  });

  test("should return an array with one FlattenedColorScale object when input contains one object with the specified weight", () => {
    const input: FlattenedColorScale[] = [
      { colorName: "red", hexCode: "#ff0000", weight: 1 },
    ];
    const output: FlattenedColorScale[] = [
      { colorName: "red", hexCode: "#ff0000", weight: 1 },
    ];
    expect(filterByWeight(input, 1)).toEqual(output);
  });

  test("should return an array with multiple FlattenedColorScale objects when input contains multiple objects with the specified weight", () => {
    const input: FlattenedColorScale[] = [
      { colorName: "red", hexCode: "#ff0000", weight: 1 },
      { colorName: "blue", hexCode: "#0000ff", weight: 1 },
    ];
    const output: FlattenedColorScale[] = [
      { colorName: "red", hexCode: "#ff0000", weight: 1 },
      { colorName: "blue", hexCode: "#0000ff", weight: 1 },
    ];
    expect(filterByWeight(input, 1)).toEqual(output);
  });

  test("should return an empty array when input contains FlattenedColorScale objects but none with the specified weight", () => {
    const input: FlattenedColorScale[] = [
      { colorName: "red", hexCode: "#ff0000", weight: 0.5 },
      { colorName: "blue", hexCode: "#0000ff", weight: 0.5 },
    ];
    const output: FlattenedColorScale[] = [];
    expect(filterByWeight(input, 1)).toEqual(output);
  });
  test("should return an array with only the FlattenedColorScale objects that match the specified weight", () => {
    const input: FlattenedColorScale[] = [
      { colorName: "red", hexCode: "#ff0000", weight: 1 },
      { colorName: "blue", hexCode: "#0000ff", weight: 1 },
      { colorName: "green", hexCode: "#00ff00", weight: 0.5 },
    ];
    const output: FlattenedColorScale[] = [
      { colorName: "red", hexCode: "#ff0000", weight: 1 },
      { colorName: "blue", hexCode: "#0000ff", weight: 1 },
    ];
    expect(filterByWeight(input, 1)).toEqual(output);
  });
});

describe("addHue function", () => {
  test("should return an empty array when input is empty", () => {
    const input: FlattenedColorScale[] = [];
    const output: WithHue[] = [];
    expect(addHue(input)).toEqual(output);
  });

  test("should return an array with one AddedHue object when input contains one FlattenedColorScale object", () => {
    const input: FlattenedColorScale[] = [
      { colorName: "red", hexCode: "#ff0000", weight: 1 },
    ];
    const output: WithHue[] = [
      { colorName: "red", hexCode: "#ff0000", weight: 1, hue: 0 },
    ];
    expect(addHue(input)).toEqual(output);
  });

  test("should return an array with multiple AddedHue objects when input contains multiple FlattenedColorScale objects", () => {
    const input: FlattenedColorScale[] = [
      { colorName: "red", hexCode: "#ff0000", weight: 1 },
      { colorName: "blue", hexCode: "#0000ff", weight: 1 },
    ];
    const output: WithHue[] = [
      { colorName: "red", hexCode: "#ff0000", weight: 1, hue: 0 },
      { colorName: "blue", hexCode: "#0000ff", weight: 1, hue: 240 },
    ];
    expect(addHue(input)).toEqual(output);
  });
});

describe("validateAllWeightsAreEqual function", () => {
  test("should not throw an error when all weights are equal", () => {
    const input: WithHue[] = [
      { colorName: "red", hexCode: "#ff0000", weight: 1, hue: 0 },
      { colorName: "blue", hexCode: "#0000ff", weight: 1, hue: 240 },
    ];
    expect(() => validateAllWeightsAreEqual(input)).not.toThrow();
  });

  test("should throw an error when weights are not equal", () => {
    const input: WithHue[] = [
      { colorName: "red", hexCode: "#ff0000", weight: 1, hue: 0 },
      { colorName: "blue", hexCode: "#0000ff", weight: 0.5, hue: 240 },
    ];
    expect(() => validateAllWeightsAreEqual(input)).toThrowError(
      "weights are not equal"
    );
  });

  test("should not throw an error when input is empty", () => {
    const input: WithHue[] = [];
    expect(() => validateAllWeightsAreEqual(input)).not.toThrow();
  });
});

describe("sortByHue function", () => {
  test("should sort an array of WithHue objects by hue in ascending order", () => {
    const input: WithHue[] = [
      { colorName: "blue", hexCode: "#0000ff", weight: 1, hue: 240 },
      { colorName: "red", hexCode: "#ff0000", weight: 1, hue: 0 },
    ];
    const output: WithHue[] = [
      { colorName: "red", hexCode: "#ff0000", weight: 1, hue: 0 },
      { colorName: "blue", hexCode: "#0000ff", weight: 1, hue: 240 },
    ];
    expect(sortByHue(input)).toEqual(output);
  });

  test("should throw an error when weights are not equal", () => {
    const input: WithHue[] = [
      { colorName: "red", hexCode: "#ff0000", weight: 1, hue: 0 },
      { colorName: "blue", hexCode: "#0000ff", weight: 0.5, hue: 240 },
    ];
    expect(() => sortByHue(input)).toThrowError(
      "the palette array needs to have equal weights"
    );
  });

  test("should return an empty array when input is empty", () => {
    const input: WithHue[] = [];
    const output: WithHue[] = [];
    expect(sortByHue(input)).toEqual(output);
  });
});

describe("validateIsSortedByHue", () => {
  test("should not throw an error if array is sorted by hue in ascending order", () => {
    const data: WithHue[] = [
      { colorName: "red", weight: 1, hexCode: "#ff0000", hue: 0 },
      { colorName: "yellow", weight: 1, hexCode: "#ffff00", hue: 60 },
      { colorName: "green", weight: 1, hexCode: "#008000", hue: 120 },
    ];
    expect(() => validateIsSortedByHue(data)).not.toThrow();
  });

  test("should throw an error if array is not sorted by hue in ascending order", () => {
    const data: WithHue[] = [
      { colorName: "red", weight: 1, hexCode: "#ff0000", hue: 0 },
      { colorName: "green", weight: 1, hexCode: "#008000", hue: 120 },
      { colorName: "yellow", weight: 1, hexCode: "#ffff00", hue: 60 },
    ];
    expect(() => validateIsSortedByHue(data)).toThrow(
      "array is not sorted by hue ascending"
    );
  });
});

describe("addAdjancentHues", () => {
  test("should add adjacent hues correctly", () => {
    const data: WithHue[] = [
      { colorName: "red", weight: 1, hexCode: "#ff0000", hue: 0 },
      { colorName: "yellow", weight: 1, hexCode: "#ffff00", hue: 60 },
      { colorName: "green", weight: 1, hexCode: "#008000", hue: 120 },
    ];
    const result = addAdjancentHues(data);
    expect(result).toEqual([
      {
        colorName: "red",
        weight: 1,
        hexCode: "#ff0000",
        hue: 0,
        prevHue: 120,
        nextHue: 60,
      },
      {
        colorName: "yellow",
        weight: 1,
        hexCode: "#ffff00",
        hue: 60,
        prevHue: 0,
        nextHue: 120,
      },
      {
        colorName: "green",
        weight: 1,
        hexCode: "#008000",
        hue: 120,
        prevHue: 60,
        nextHue: 0,
      },
    ]);
  });
});
