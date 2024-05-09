import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { createPalette } from "@/core/palette";
import { frameworks, type Framework } from "@/core/domain";

import { generateCode } from "@/core/code";
import { validateHexColorValue } from "@/core/validators";

import { ColorScale } from "@/core/domain";
import {
  INITIAL_HEX_VALUE,
  INITAL_PALETTE,
  INITIAL_FRAMEWORK,
  INITIAL_CONFIGURATION_CODE,
  INITIAL_CODE_LANGUAGE,
} from "./initializeStates";

interface InitialState {
  /**
   * hex value picked by user
   */
  pickedHexValue: string;

  /**
   * True if hex code is valid according to the domain rules
   */
  isValidHex: boolean;

  /**
   * current color palette generated from picked hex value
   */
  currentPalette: ColorScale[];

  /**
   * available frameworks choices
   */
  frameworks: typeof frameworks;

  /**
   * currently selected framework by user
   */
  activeFramework: Framework;

  /**
   * generated configuration code for the framework
   */
  configurationCode: string;

  /**
   * language of the generated code
   */
  codeLanguage: "javascript" | "css" | "scss";
}

const initialState: InitialState = {
  pickedHexValue: INITIAL_HEX_VALUE,
  isValidHex: true,
  currentPalette: INITAL_PALETTE,
  frameworks: frameworks,
  activeFramework: INITIAL_FRAMEWORK,
  configurationCode: INITIAL_CONFIGURATION_CODE,
  codeLanguage: INITIAL_CODE_LANGUAGE,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setHexValue: (state, action: PayloadAction<string>) => {
      state.pickedHexValue = action.payload;

      if (validateHexColorValue(action.payload)) {
        state.isValidHex = true;
        state.currentPalette = createPalette(action.payload);
        switch (state.activeFramework) {
          case "tailwind":
            state.configurationCode = generateCode(
              state.activeFramework,
              state.currentPalette
            );
            state.codeLanguage = "javascript";
            break;
          case "bootstrap 4":
            state.configurationCode = generateCode(
              state.activeFramework,
              state.currentPalette
            );
            state.codeLanguage = "scss";
            break;
          case "css":
            state.configurationCode = generateCode(
              state.activeFramework,
              state.currentPalette
            );
            state.codeLanguage = "css";
            break;
        }
      } else {
        state.isValidHex = false;
      }
    },
    setActiveFramework: (state, action: PayloadAction<Framework>) => {
      state.activeFramework = action.payload;
      switch (action.payload) {
        case "tailwind":
          state.configurationCode = generateCode(
            state.activeFramework,
            state.currentPalette
          );
          state.codeLanguage = "javascript";
          break;
        case "bootstrap 4":
          state.configurationCode = generateCode(
            state.activeFramework,
            state.currentPalette
          );
          state.codeLanguage = "scss";
          break;
        case "css":
          state.configurationCode = generateCode(
            state.activeFramework,
            state.currentPalette
          );
          state.codeLanguage = "css";
          break;
      }
    },
  },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
