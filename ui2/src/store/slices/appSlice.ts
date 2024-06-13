import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  type CreatePalleteInputDto,
  appService,
  type ColorScale,
  type Framework,
} from "@/core/appService";

interface SliceState {
  /**
   * saturation mod
   */
  saturationMod: number;

  /**
   * hue mod
   */
  hueMod: number;

  /**
   * current color palette generated from picked hex value
   */
  currentPalette: ColorScale[];

  /**
   * available frameworks choices
   */
  frameworks: string[];

  /**
   * currently selected framework by user
   */
  activeFramework: Framework;

  /**
   * generated configuration code for the framework
   */
  configurationCode: string;
}

const initialState: SliceState = {
  saturationMod: appService.initializeState().saturationMod,
  hueMod: appService.initializeState().hueMod,
  currentPalette: appService.initializeState().paletteData,
  frameworks: appService.initializeState().frameworksList,
  activeFramework: appService.initializeState().framework,
  configurationCode: appService.initializeState().code,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setActiveFramework: (state, action: PayloadAction<Framework>) => {
      state.activeFramework = action.payload;
      state.configurationCode = newConfigurationCode(state);
    },
  },
});

/**
 * Call to generate framework configuration code based on current slice state.
 * @param state current slice state
 * @returns framework configuration code based on current state
 */
function newConfigurationCode(state: SliceState) {
  const inputDto: CreatePalleteInputDto = {
    saturationMod: state.saturationMod,
    hueMod: state.hueMod,
    framework: state.activeFramework,
  };
  const code = appService.createPalette(inputDto).code;
  return code;
}

export const appActions = appSlice.actions;
export default appSlice.reducer;
