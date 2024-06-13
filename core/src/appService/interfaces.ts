import {
  type Framework,
  type ColorScale,
  type ModFactor,
} from "../domain/types";

type IFrameworkModuleApi = {
  getOriginalPalette: (framework: Framework) => ColorScale[];
  generateConfigurationCode: (
    framework: Framework,
    palette: ColorScale[]
  ) => string;
};

type IDomainModuleApi = {
  modifyPallete: (palette: ColorScale[], modFactor: ModFactor) => ColorScale[];
};

export { type IFrameworkModuleApi, type IDomainModuleApi };
