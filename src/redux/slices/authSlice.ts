import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("authToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem("authToken");
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
