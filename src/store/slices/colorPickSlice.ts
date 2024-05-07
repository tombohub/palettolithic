import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  hexValue: string;
}

const initialState: InitialState = {
  hexValue: "07c",
};

export const colorPickSlice = createSlice({
  name: "color-pick",
  initialState,
  reducers: {
    setHexValue: (state, action: PayloadAction<string>) => {
      state.hexValue = action.payload;
    },
  },
});

export const colorPickActions = colorPickSlice.actions;
export default colorPickSlice.reducer;
