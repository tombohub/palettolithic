import chroma from "chroma-js";
import { Hex, Hue, Saturation, Luminosity, HSL } from "./valueObjects";

export function hexToHsl(hex: Hex): HSL {
  const [h, s, l] = chroma(hex.value).hsl();
  const hue = new Hue(h);
  const saturation = new Saturation(s);
  const luminosity = new Luminosity(l);

  return new HSL(hue, saturation, luminosity);
}
