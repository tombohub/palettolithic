import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { createPalette } from "@/core/palette";
import { ColorScale } from "@/core/domain";

interface InitialState {
  pickedHexValue: string;
  palette: ColorScale[];
}

const initialState: InitialState = {
  pickedHexValue: "07c",
  palette: createPalette("07c"),
};

const paletteSlice = createSlice({
  name: "palette",
  initialState,
  reducers: {
    setHexValue: (state, action: PayloadAction<string>) => {
      state.pickedHexValue = action.payload;
      state.palette = createPalette(action.payload);
    },
  },
});

export const colorPickActions = paletteSlice.actions;
export default paletteSlice.reducer;
