import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserDataType {
  age: number;
  firstName: string;
  gender: string;
  govtIssuedId: string;
  govtIssuedIdType: string;
  mobile: string;
  address: string;
  city: string;
  country: string;
  pincode: string;
  state: string;
}

const initialState: UserDataType[] = [
  {
    age: 45,
    firstName: "demo 1",
    gender: "male",
    govtIssuedId: "1234454555",
    govtIssuedIdType: "Aadhar",
    mobile: "9347548545",
    address: "string",
    city: "lucknow",
    country: "india",
    pincode: "34823",
    state: "UP",
  },

  {
    age: 25,
    firstName: "demo 2",
    gender: "female",
    govtIssuedId: "dhfksd",
    govtIssuedIdType: "PAN",
    mobile: "934754855",
    address: "string",
    city: "lucknow 2",
    country: "india",
    pincode: "34823",
    state: "Bihar",
  },
];

export const userdataSlice = createSlice({
  name: "userdata",
  initialState,
  reducers: {
    storeUserData: (state, action: PayloadAction<UserDataType>) => {
      state.push(action.payload);
    },
  },
});

export const { storeUserData } = userdataSlice.actions;

export default userdataSlice.reducer;
