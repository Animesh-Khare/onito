import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface StepOneDataType {
  age: number;
  firstName: string;
  gender: string;
  govtIssuedId: string;
  govtIssuedIdType: string;
  mobile: string;
}

export interface StepOneState {
  steponeData: StepOneDataType;
}

const initialState: StepOneState = {
  steponeData: {
    age: 0,
    firstName: "",
    gender: "",
    govtIssuedId: "",
    govtIssuedIdType: "",
    mobile: "",
  },
};

export const steponeSlice = createSlice({
  name: "stepone",
  initialState,
  reducers: {
    storeStepOneData: (state, action: PayloadAction<StepOneDataType>) => {
      state.steponeData = action.payload;
    },
  },
});

export const { storeStepOneData } = steponeSlice.actions;

export default steponeSlice.reducer;
