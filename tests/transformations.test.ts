import { describe, test, expect, it } from "vitest";
import {
  type FlattenedColorScale,
  type WithHue,
  type WithAdjancentHues,
  type WithHueRange,
  type WithModifiedHex,
  flatten,
  filterByWeight,
  addHue,
  validateAllWeightsAreEqual,
  sortByHue,
  validateIsSortedByHue,
  addAdjancentHues,
  getDistinctWeights,
  addHueRanges,
  addModifiedHex,
  transformToColorScale,
} from "../src/core/domain/transformations";
import { ColorScale, type ModFactor } from "../src/core/domain/types";

describe("flatten function", () => {
  test("should return an empty array when input is empty", () => {
    const input: ColorScale[] = [];
    const output: FlattenedColorScale[] = [];
    expect(flatten(input)).toEqual(output);
  });

  test("should return an array with one FlattenedColorScale object when input contains one ColorScale object with one shade", () => {
    const input: ColorScale[] = [
      {
        _tag: "ChromaticColorScale",
        colorName: "red",
        order: 1,
        shades: [{ hexCode: "#ff0000", weight: 1 }],
      },
    ];
    const output: FlattenedColorScale[] = [
      { colorName: "red", order: 1, hexCode: "#ff0000", weight: 1 },
    ];
    expect(flatten(input)).toEqual(output);
  });

  test("should return an array with multiple FlattenedColorScale objects when input contains one ColorScale object with multiple shades", () => {
    const input: ColorScale[] = [
      {
        _tag: "ChromaticColorScale",
        colorName: "red",
        order: 1,
        shades: [
          { hexCode: "#ff0000", weight: 1 },
          { hexCode: "#ff7f7f", weight: 0.5 },
        ],
      },
    ];
    const output: FlattenedColorScale[] = [
      { colorName: "red", order: 1, hexCode: "#ff0000", weight: 1 },
      { colorName: "red", order: 1, hexCode: "#ff7f7f", weight: 0.5 },
    ];
    expect(flatten(input)).toEqual(output);
  });

  test("should return an array with FlattenedColorScale objects corresponding to each shade of each ColorScale object when input contains multiple ColorScale objects with multiple shades", () => {
    const input: ColorScale[] = [
      {
        _tag: "ChromaticColorScale",
        colorName: "red",
        order: 1,
        shades: [
          { hexCode: "#ff0000", weight: 1 },
          { hexCode: "#ff7f7f", weight: 0.5 },
        ],
      },
      {
        _tag: "ChromaticColorScale",
        colorName: "blue",
        order: 2,
        shades: [
          { hexCode: "#0000ff", weight: 1 },
          { hexCode: "#7f7fff", weight: 0.5 },
        ],
      },
    ];
    const output: FlattenedColorScale[] = [
      { colorName: "red", order: 1, hexCode: "#ff0000", weight: 1 },
      { colorName: "red", order: 1, hexCode: "#ff7f7f", weight: 0.5 },
      { colorName: "blue", order: 2, hexCode: "#0000ff", weight: 1 },
      { colorName: "blue", order: 2, hexCode: "#7f7fff", weight: 0.5 },
    ];
    expect(flatten(input)).toEqual(output);
  });
});

describe("getDistinctWeights", () => {
  it("should extract distinct weights from an array of FlattenedColorScale objects", () => {
    const data: FlattenedColorScale[] = [
      { colorName: "blue", hexCode: "", order: 1, weight: 100 },
      { colorName: "blue", hexCode: "", order: 1, weight: 200 },
      { colorName: "blue", hexCode: "", order: 1, weight: 300 },
      { colorName: "red", hexCode: "", order: 2, weight: 100 },
      { colorName: "red", hexCode: "", order: 2, weight: 200 },
      { colorName: "red", hexCode: "", order: 2, weight: 300 },
      { colorName: "red", hexCode: "", order: 2, weight: 400 },
    ];

    const result = getDistinctWeights(data);

    const expectedResult = [100, 200, 300, 400];

    expect(result).toEqual(expectedResult);
  });

  it("should return an empty array when input data is empty", () => {
    const data: FlattenedColorScale[] = [];

    const result = getDistinctWeights(data);

    // Expected result is an empty array.
    const expectedResult: number[] = [];

    expect(result).toEqual(expectedResult);
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
      { colorName: "red", order: 1, hexCode: "#ff0000", weight: 1 },
    ];
    const output: FlattenedColorScale[] = [
      { colorName: "red", order: 1, hexCode: "#ff0000", weight: 1 },
    ];
    expect(filterByWeight(input, 1)).toEqual(output);
  });

  test("should return an array with multiple FlattenedColorScale objects when input contains multiple objects with the specified weight", () => {
    const input: FlattenedColorScale[] = [
      { colorName: "red", order: 1, hexCode: "#ff0000", weight: 1 },
      { colorName: "blue", order: 2, hexCode: "#0000ff", weight: 1 },
    ];
    const output: FlattenedColorScale[] = [
      { colorName: "red", order: 1, hexCode: "#ff0000", weight: 1 },
      { colorName: "blue", order: 2, hexCode: "#0000ff", weight: 1 },
    ];
    expect(filterByWeight(input, 1)).toEqual(output);
  });

  test("should return an empty array when input contains FlattenedColorScale objects but none with the specified weight", () => {
    const input: FlattenedColorScale[] = [
      { colorName: "red", order: 1, hexCode: "#ff0000", weight: 0.5 },
      { colorName: "blue", order: 2, hexCode: "#0000ff", weight: 0.5 },
    ];
    const output: FlattenedColorScale[] = [];
    expect(filterByWeight(input, 1)).toEqual(output);
  });
  test("should return an array with only the FlattenedColorScale objects that match the specified weight", () => {
    const input: FlattenedColorScale[] = [
      { colorName: "red", order: 1, hexCode: "#ff0000", weight: 1 },
      { colorName: "blue", order: 2, hexCode: "#0000ff", weight: 1 },
      { colorName: "green", order: 3, hexCode: "#00ff00", weight: 0.5 },
    ];
    const output: FlattenedColorScale[] = [
      { colorName: "red", order: 1, hexCode: "#ff0000", weight: 1 },
      { colorName: "blue", order: 2, hexCode: "#0000ff", weight: 1 },
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
      { colorName: "blue", order: 1, hexCode: "#0000ff", weight: 1 },
    ];
    const output: WithHue[] = [
      { colorName: "blue", order: 1, hexCode: "#0000ff", weight: 1, hue: 240 },
    ];
    expect(addHue(input)).toEqual(output);
  });

  test("should return an array with multiple AddedHue objects when input contains multiple FlattenedColorScale objects", () => {
    const input: FlattenedColorScale[] = [
      { colorName: "red", order: 1, hexCode: "#ff0000", weight: 1 },
      { colorName: "blue", order: 2, hexCode: "#0000ff", weight: 1 },
    ];
    const output: WithHue[] = [
      { colorName: "red", order: 1, hexCode: "#ff0000", weight: 1, hue: 0 },
      { colorName: "blue", order: 2, hexCode: "#0000ff", weight: 1, hue: 240 },
    ];
    expect(addHue(input)).toEqual(output);
  });
});

describe("validateAllWeightsAreEqual function", () => {
  test("should not throw an error when all weights are equal", () => {
    const input: WithHue[] = [
      { colorName: "red", order: 1, hexCode: "#ff0000", weight: 1, hue: 0 },
      { colorName: "blue", order: 2, hexCode: "#0000ff", weight: 1, hue: 240 },
    ];
    expect(() => validateAllWeightsAreEqual(input)).not.toThrow();
  });

  test("should throw an error when weights are not equal", () => {
    const input: WithHue[] = [
      { colorName: "red", order: 1, hexCode: "#ff0000", weight: 1, hue: 0 },
      {
        colorName: "blue",
        order: 2,
        hexCode: "#0000ff",
        weight: 0.5,
        hue: 240,
      },
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
      { colorName: "blue", order: 1, hexCode: "#0000ff", weight: 1, hue: 240 },
      { colorName: "red", order: 2, hexCode: "#ff0000", weight: 1, hue: 0 },
      { colorName: "green", order: 2, hexCode: "#00ff00", weight: 1, hue: 120 },
    ];
    const output: WithHue[] = [
      { colorName: "red", order: 2, hexCode: "#ff0000", weight: 1, hue: 0 },
      { colorName: "green", order: 2, hexCode: "#00ff00", weight: 1, hue: 120 },
      { colorName: "blue", order: 1, hexCode: "#0000ff", weight: 1, hue: 240 },
    ];
    expect(sortByHue(input)).toEqual(output);
  });

  test("should throw an error when weights are not equal", () => {
    const input: WithHue[] = [
      { colorName: "red", order: 1, hexCode: "#ff0000", weight: 1, hue: 0 },
      {
        colorName: "blue",
        order: 2,
        hexCode: "#0000ff",
        weight: 0.5,
        hue: 240,
      },
    ];
    expect(() => sortByHue(input)).toThrowError();
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
      { colorName: "red", order: 1, weight: 1, hexCode: "#ff0000", hue: 0 },
      { colorName: "yellow", order: 2, weight: 1, hexCode: "#ffff00", hue: 60 },
      { colorName: "green", order: 3, weight: 1, hexCode: "#008000", hue: 120 },
    ];
    expect(() => validateIsSortedByHue(data)).not.toThrow();
  });

  test("should throw an error if array is not sorted by hue in ascending order", () => {
    const data: WithHue[] = [
      { colorName: "red", order: 1, weight: 1, hexCode: "#ff0000", hue: 0 },
      { colorName: "green", order: 2, weight: 1, hexCode: "#008000", hue: 120 },
      { colorName: "yellow", order: 3, weight: 1, hexCode: "#ffff00", hue: 60 },
    ];
    expect(() => validateIsSortedByHue(data)).toThrow();
  });
});

describe("addAdjancentHues", () => {
  test("should add adjacent hues correctly", () => {
    const data: WithHue[] = [
      { colorName: "red", order: 1, weight: 1, hexCode: "#ff0000", hue: 0 },
      { colorName: "yellow", order: 2, weight: 1, hexCode: "#ffff00", hue: 60 },
      { colorName: "green", order: 3, weight: 1, hexCode: "#008000", hue: 120 },
    ];
    const result = addAdjancentHues(data);

    const expected: WithAdjancentHues[] = [
      {
        colorName: "red",
        order: 1,
        weight: 1,
        hexCode: "#ff0000",
        hue: 0,
        prevHue: 120,
        nextHue: 60,
      },
      {
        colorName: "yellow",
        weight: 1,
        order: 2,
        hexCode: "#ffff00",
        hue: 60,
        prevHue: 0,
        nextHue: 120,
      },
      {
        colorName: "green",
        weight: 1,
        order: 3,
        hexCode: "#008000",
        hue: 120,
        prevHue: 60,
        nextHue: 0,
      },
    ];
    expect(result).toEqual(expected);
  });
  it("should be ok", () => {
    const data: WithHue[] = [
      {
        colorName: "blue",
        order: 16,
        hexCode: "#2563eb",
        weight: 600,
        hue: 221.21212121212122,
      },
      {
        colorName: "indigo",
        order: 17,
        hexCode: "#4f46e5",
        weight: 600,
        hue: 243.39622641509433,
      },
      {
        colorName: "violet",
        order: 18,
        hexCode: "#7c3aed",
        weight: 600,
        hue: 262.1229050279329,
      },
    ];
    const result = addAdjancentHues(data);

    const expected: WithAdjancentHues[] = [
      {
        colorName: "blue",
        order: 16,
        hexCode: "#2563eb",
        weight: 600,
        hue: 221.21212121212122,
        prevHue: 262.1229050279329,
        nextHue: 243.39622641509433,
      },
      {
        colorName: "indigo",
        order: 17,
        hexCode: "#4f46e5",
        weight: 600,
        hue: 243.39622641509433,
        prevHue: 221.21212121212122,
        nextHue: 262.1229050279329,
      },
      {
        colorName: "violet",
        order: 18,
        hexCode: "#7c3aed",
        weight: 600,
        hue: 262.1229050279329,
        prevHue: 243.39622641509433,
        nextHue: 221.21212121212122,
      },
    ];
    expect(result).toEqual(expected);
  });
});

describe("addHueRanges", () => {
  it("should add hue ranges to the flattened palette with adjacent hues", () => {
    const data: WithAdjancentHues[] = [
      {
        colorName: "red",
        order: 1,
        weight: 1,
        hexCode: "#ff0000",
        hue: 0,
        prevHue: 120,
        nextHue: 60,
      },
      {
        colorName: "yellow",
        weight: 1,
        order: 2,
        hexCode: "#ffff00",
        hue: 60,
        prevHue: 0,
        nextHue: 120,
      },
      {
        colorName: "green",
        weight: 1,
        order: 3,
        hexCode: "#008000",
        hue: 120,
        prevHue: 60,
        nextHue: 0,
      },
    ];

    const result = addHueRanges(data);

    // Expected result is based on the behavior of the addHueRanges function.
    // This might need to be updated if the function's behavior changes.
    const expectedResult: WithHueRange[] = [
      {
        colorName: "red",
        order: 1,
        weight: 1,
        hexCode: "#ff0000",
        hue: 0,
        prevHue: 120,
        nextHue: 60,
        minHue: 240,
        maxHue: 30,
      },
      {
        colorName: "yellow",
        weight: 1,
        order: 2,
        hexCode: "#ffff00",
        hue: 60,
        prevHue: 0,
        nextHue: 120,
        minHue: 30,
        maxHue: 90,
      },
      {
        colorName: "green",
        weight: 1,
        order: 3,
        hexCode: "#008000",
        hue: 120,
        prevHue: 60,
        nextHue: 0,
        minHue: 90,
        maxHue: 240,
      },
    ];

    expect(result).toEqual(expectedResult);
  });

  it("should handle an empty input array", () => {
    const data: WithAdjancentHues[] = [];

    const result = addHueRanges(data);

    // Expected result is an empty array.
    const expectedResult: WithAdjancentHues[] = [];

    expect(result).toEqual(expectedResult);
  });
});

describe("addModifiedHex", () => {
  it("should add modified hex code to the flattened palette with hue ranges", () => {
    const data: WithHueRange[] = [
      {
        colorName: "red",
        order: 1,
        weight: 1,
        hexCode: "#bf4040",
        hue: 0,
        prevHue: 120,
        nextHue: 60,
        minHue: 240,
        maxHue: 30,
      },
      {
        colorName: "yellow",
        weight: 1,
        order: 2,
        hexCode: "#bfbf40",
        hue: 60,
        prevHue: 0,
        nextHue: 120,
        minHue: 30,
        maxHue: 90,
      },
      {
        colorName: "green",
        weight: 1,
        order: 3,
        hexCode: "#40bf40",
        hue: 120,
        prevHue: 60,
        nextHue: 0,
        minHue: 90,
        maxHue: 240,
      },
    ];
    const modFactor: ModFactor = {
      hueMod: 0.5,
      satMod: 0.5,
    };

    const result = addModifiedHex(data, modFactor);

    const expected: WithModifiedHex[] = [
      {
        colorName: "red",
        order: 1,
        weight: 1,
        hexCode: "#bf4040",
        hue: 0,
        prevHue: 120,
        nextHue: 60,
        minHue: 240,
        maxHue: 30,
        modifiedHex: "#df5020",
      },
      {
        colorName: "yellow",
        weight: 1,
        order: 2,
        hexCode: "#bfbf40",
        hue: 60,
        prevHue: 0,
        nextHue: 120,
        minHue: 30,
        maxHue: 90,
        modifiedHex: "#afdf20",
      },
      {
        colorName: "green",
        weight: 1,
        order: 3,
        hexCode: "#40bf40",
        hue: 120,
        prevHue: 60,
        nextHue: 0,
        minHue: 90,
        maxHue: 240,
        modifiedHex: "#20dfdf",
      },
    ];

    expect(result).toEqual(expected);
  });

  it("should handle an empty input array", () => {
    const data: WithHueRange[] = [];
    const modFactor: ModFactor = {
      hueMod: 0.5,
      satMod: 0.5,
    };

    const result = addModifiedHex(data, modFactor);

    // Expected result is an empty array.
    const expectedResult: WithHueRange[] = [];

    expect(result).toEqual(expectedResult);
  });
});

describe("transformToColorScale", () => {
  it("should transform data to color scale", () => {
    const data: WithModifiedHex[] = [
      {
        colorName: "red",
        order: 1,
        weight: 1,
        hexCode: "#bf4040",
        hue: 0,
        prevHue: 120,
        nextHue: 60,
        minHue: 240,
        maxHue: 30,
        modifiedHex: "#df5020",
      },
      {
        colorName: "red",
        order: 1,
        weight: 2,
        hexCode: "#bf4040",
        hue: 0,
        prevHue: 120,
        nextHue: 60,
        minHue: 240,
        maxHue: 30,
        modifiedHex: "#red2hex",
      },
      {
        colorName: "yellow",
        weight: 1,
        order: 2,
        hexCode: "#bfbf40",
        hue: 60,
        prevHue: 0,
        nextHue: 120,
        minHue: 30,
        maxHue: 90,
        modifiedHex: "#afdf20",
      },
      {
        colorName: "green",
        weight: 1,
        order: 3,
        hexCode: "#40bf40",
        hue: 120,
        prevHue: 60,
        nextHue: 0,
        minHue: 90,
        maxHue: 240,
        modifiedHex: "#20dfdf",
      },
    ];

    const result = transformToColorScale(data);

    const expectedResult: ColorScale[] = [
      {
        _tag: "ChromaticColorScale",
        colorName: "red",
        order: 1,
        shades: [
          { weight: 1, hexCode: "#df5020" },
          { weight: 2, hexCode: "#red2hex" },
        ],
      },
      {
        _tag: "ChromaticColorScale",
        colorName: "yellow",
        order: 2,
        shades: [{ weight: 1, hexCode: "#afdf20" }],
      },
      {
        _tag: "ChromaticColorScale",
        colorName: "green",
        order: 3,
        shades: [{ weight: 1, hexCode: "#20dfdf" }],
      },
    ];

    expect(result).toEqual(expectedResult);
  });

  it("should handle an empty input array", () => {
    const data: WithModifiedHex[] = [];

    const result = transformToColorScale(data);

    // Expected result is an empty array.
    const expectedResult: ColorScale[] = [];

    expect(result).toEqual(expectedResult);
  });
});
