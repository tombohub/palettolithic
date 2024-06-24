import { _modifyHueAttribute, modifyHex, findHueRange } from "./domain/logic";
import { ColorScale, domainModule } from "./domain";
import { chromaticPalette } from "./frameworks/tailwind3/data";

const r = findHueRange(224, 201, 245);

const k = modifyHex("#1d4fd7", r.min, r.max, { hueMod: -0.38, satMod: 0 });

const p: ColorScale[] = [
  { colorName: "sky", order: 1, shades: [{ weight: 1, hexCode: "#0369a1" }] },
  { colorName: "blue", order: 2, shades: [{ weight: 1, hexCode: "#1d4ed8" }] },
  {
    colorName: "indigo",
    order: 3,
    shades: [{ weight: 1, hexCode: "#4338ca" }],
  },
];
const l = domainModule.modifyPallete(chromaticPalette, {
  hueMod: -0.11,
  satMod: 0,
});
console.log("new indigo:600 is ", l[16].shades[6].hexCode);
// console.dir(l, { depth: null });
