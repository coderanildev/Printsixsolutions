import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  message: {},
  snackBar: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState: initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action?.payload;
    },
    setSnackMessage: (state, action) => {
      const newBar = {
        message: action?.payload,
        key: new Date().getTime(),
      };
      state.snackBar.push(newBar);
      state.openSnackBar = true;
    },
    setSnackPack: (state, action) => {
      state.snackBar = action?.payload;
    },
  },
});

export const { setMessage, setSnackMessage, setSnackPack } =
  messageSlice.actions;

export default messageSlice.reducer;

export const selectMessage = (state: any) => state.message.message;
export const getSnackContent = (state: any) => state.message.snackBar;
