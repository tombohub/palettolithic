import {
  type CreatePalleteInputDto,
  type CreatePaletteOutputDto,
  type InitialStateDto,
} from "./dto";
import { type Framework, type ModFactor } from "../domain/types";
import { frameworksList } from "../domain/constants";
import { domainModule } from "../domain";
import { generateConfigurationCode, getOriginalPalette } from "../frameworks";

/**
 * Generate palette from user inputs
 * @param input user selected inputs
 * @returns generated palette
 */
export function createPalette(
  input: CreatePalleteInputDto
): CreatePaletteOutputDto {
  // collect framework setup data
  const originalPalette = getOriginalPalette(input.framework);

  const modFactor: ModFactor = {
    hueMod: input.hueMod,
    satMod: input.saturationMod,
  };
  const newPalette = domainModule.modifyPallete(originalPalette, modFactor);

  const code = generateConfigurationCode(input.framework, newPalette);

  const output: CreatePaletteOutputDto = { code, palette: newPalette };
  return output;
}

/**
 * Initialize data and state for the first time load
 * @returns Initial data and state for the app
 */
export function initializeState(): InitialStateDto {
  const initialFramework: Framework = "tailwind";
  const initialSaturationMod = 0;
  const initialHueMod = 0;

  // simulate user pick
  const inputDto: CreatePalleteInputDto = {
    framework: initialFramework,
    saturationMod: initialSaturationMod,
    hueMod: initialHueMod,
  };
  const pallete = createPalette(inputDto);

  const initialDto: InitialStateDto = {
    frameworksList: [...frameworksList],
    saturationMod: initialSaturationMod,
    hueMod: initialHueMod,
    code: pallete.code,
    paletteData: pallete.palette,
    framework: initialFramework,
  };

  return initialDto;
}
