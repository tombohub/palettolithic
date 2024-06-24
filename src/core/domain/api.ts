import { type ColorScale, type ModFactor } from "./types";
import {
  WithAdjancentHues,
  addAdjancentHues,
  addHue,
  addHueRanges,
  addModifiedHex,
  filterByWeight,
  flatten,
  getDistinctWeights,
  sortByHue,
  transformToColorScale,
} from "./transformations";

export const domainModule = {
  modifyPallete: (palette: ColorScale[], modFactor: ModFactor) => {
    const flattened = flatten(palette);
    const weights = getDistinctWeights(flattened);

    const withAdjancentHues: WithAdjancentHues[] = weights.flatMap(weight => {
      const filteredByWeight = filterByWeight(flattened, weight);
      const addedHues = addHue(filteredByWeight);
      const sortedByHue = sortByHue(addedHues);
      const addedAdjancentHues = addAdjancentHues(sortedByHue);

      console.dir(
        addedHues.filter(x => x.weight === 600),
        { depth: null }
      );

      return addedAdjancentHues;
    });

    const withHueRanges = addHueRanges(withAdjancentHues);
    const withModifiedHex = addModifiedHex(withHueRanges, modFactor);
    const newPalette = transformToColorScale(withModifiedHex);
    return newPalette;
  },
};
