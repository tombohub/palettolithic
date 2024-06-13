import { type IDomainModuleApi } from "../appService/interfaces";
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

export const domainModule: IDomainModuleApi = {
  modifyPallete: (palette: ColorScale[], modFactor: ModFactor) => {
    const flattened = flatten(palette);
    const weights = getDistinctWeights(flattened);

    const withAdjancentHues: WithAdjancentHues[] = weights.flatMap(weight => {
      const filteredByWeight = filterByWeight(flattened, weight);
      const addedHues = addHue(filteredByWeight);
      const sortedByHue = sortByHue(addedHues);
      const addedAdjancentHues = addAdjancentHues(sortedByHue);
      return addedAdjancentHues;
    });

    const withHueRanges = addHueRanges(withAdjancentHues);
    const withModifiedHex = addModifiedHex(withHueRanges, modFactor);
    const newPalette = transformToColorScale(withModifiedHex);
    return newPalette;
  },
};
