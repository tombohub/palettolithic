import {
  type Framework,
  type ColorScale,
  type ModFactor,
} from "../domain/types";

type IDomainModuleApi = {
  modifyPallete: (palette: ColorScale[], modFactor: ModFactor) => ColorScale[];
};

export { type IDomainModuleApi };
