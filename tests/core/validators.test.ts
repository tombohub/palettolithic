import { describe, test, expect } from "vitest";
import { validateHexColorValue } from "../../src/core/validators";

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
