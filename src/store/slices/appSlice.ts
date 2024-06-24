import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  createPalette,
  initializeState,
  type CreatePalleteInputDto,
  type CreatePaletteOutputDto,
  type InitialStateDto,
  type Framework,
  frameworksList,
} from "@/core";

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
  currentPalette: CreatePaletteOutputDto["palette"];

  /**
   * available frameworks choices
   */
  frameworks: typeof frameworksList;

  /**
   * currently selected framework by user
   */
  activeFramework: InitialStateDto["framework"];

  /**
   * generated configuration code for the framework
   */
  configurationCode: string;
}

const initialState: SliceState = {
  saturationMod: initializeState().saturationMod,
  hueMod: initializeState().hueMod,
  currentPalette: initializeState().paletteData,
  frameworks: initializeState().frameworksList,
  activeFramework: initializeState().framework,
  configurationCode: initializeState().code,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setActiveFramework: (state, action: PayloadAction<Framework>) => {
      state.activeFramework = action.payload;
      state.configurationCode = newPaletteAndCode(state).code;
      state.currentPalette = newPaletteAndCode(state).palette.sort(
        (a, b) => a.order - b.order
      );
    },
    setHueMod: (state, action: PayloadAction<number>) => {
      state.hueMod = action.payload;
      state.configurationCode = newPaletteAndCode(state).code;
      state.currentPalette = newPaletteAndCode(state).palette.sort(
        (a, b) => a.order - b.order
      );
    },
    setSatMod: (state, action: PayloadAction<number>) => {
      state.saturationMod = action.payload;
      state.configurationCode = newPaletteAndCode(state).code;
      state.currentPalette = newPaletteAndCode(state).palette.sort(
        (a, b) => a.order - b.order
      );
    },
  },
});

/**
 * Call to generate framework configuration code based on current slice state.
 * @param state current slice state
 * @returns framework configuration code based on current state
 */
function newPaletteAndCode(state: SliceState) {
  const inputDto: CreatePalleteInputDto = {
    saturationMod: state.saturationMod,
    hueMod: state.hueMod,
    framework: state.activeFramework,
  };
  const palette = createPalette(inputDto).palette;
  const code = createPalette(inputDto).code;
  return { palette, code };
}

export const appActions = appSlice.actions;
export default appSlice.reducer;
