import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Framework } from "@/core/domain";

interface InitialState {
  activeFramework: Framework;
}

const initialState: InitialState = {
  activeFramework: "tailwind",
};

const frameworkSlice = createSlice({
  name: "framework",
  initialState,
  reducers: {
    setActiveFramework: (state, action: PayloadAction<Framework>) => {
      state.activeFramework = action.payload;
    },
  },
});

export const frameworkActions = frameworkSlice.actions;
export default frameworkSlice.reducer;
