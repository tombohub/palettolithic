import { number } from "effect/Equivalence";
import {
  validateHexColorValue,
  validateHue,
  validateLuminosity,
  validateSaturation,
} from "./validators";

abstract class ValueObject<T> {
  /**
   * this is the discard variable just so the value object cannot
   * be created directly :
   * ```const vo: Hex = {value: 'invalidValue'}```
   */
  private readonly _: string = "";
  abstract readonly value: T;
}

export class Hex extends ValueObject<string> {
  readonly value: string;
  constructor(value: string) {
    super();
    if (!validateHexColorValue(value)) {
      throw new Error(`Invalid hex code: ${value}`);
    }
    this.value = value;
  }
}

export class Hue extends ValueObject<number> {
  readonly value: number;

  constructor(value: number) {
    super();
    if (!validateHue(value)) {
      throw new Error(`Invalid hue value: ${value}`);
    }
    this.value = value;
  }
}

export class Saturation extends ValueObject<number> {
  readonly value: number;

  constructor(value: number) {
    super();

    if (!validateSaturation(value)) {
      throw new Error(`Invalid saturation value: ${value}`);
    }

    this.value = value;
  }
}

export class Luminosity extends ValueObject<number> {
  readonly value: number;

  constructor(value: number) {
    super();

    if (!validateLuminosity(value)) {
      throw new Error(`Invalid luminosity value: ${value}`);
    }
    this.value = value;
  }
}

export class HSL {
  constructor(
    readonly hue: Hue,
    readonly saturation: Saturation,
    readonly luminosity: Luminosity
  ) {}
}
