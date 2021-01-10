import { createSlice } from "@reduxjs/toolkit";
import http from "../api/httpService";
import api from "../api/constants";
import RSA from "../security/rsa";
import ClientKeys from "../security/keys";

// Slice
const slice = createSlice({
  name: "auth",
  initialState: {
    serverPublicKey: "",
    key: null,
    loading: true,
    error: "",
    errors: false,
  },
  reducers: {
    exchangeKeysSuccess: (state, action) => {
      state.serverPublicKey = action.payload;
      state.loading = false;
      state.errors = false;
    },
    exchangeKeysError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.errors = true;
    },
    setPassSuccess: (state, action) => {
      state.key = action.payload;
      state.loading = false;
      state.errors = false;
    },
    setPassError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.errors = true;
    },
  },
});
export default slice.reducer;
// Actions
const {
  exchangeKeysSuccess,
  exchangeKeysError,
  setPassSuccess,
  setPassError,
} = slice.actions;

export const exchangeKeys = () => async (dispatch) => {
  try {
    const keys = RSA.generate(250);
    ClientKeys.setKeys(keys);
    const data = {
      pubKey: keys.pubKey,
      pubExp: keys.pubExp,
    };
    const res = await http.post(`${api.AUTH}`, data);
    dispatch(exchangeKeysSuccess(res.data));
  } catch (e) {
    dispatch(exchangeKeysError(e.response.data.error));
  }
};
export const sendPassword = (password, pubKey, pubExp) => async (dispatch) => {
  try {
    const encryptedPass = RSA.encryptMessage(password, pubKey, pubExp);
    const res = await http.post(`${api.SET_PASS}`, { encryptedPass });
    console.log(res);
    const str = res.data.toString();
    console.log(str);
    const clientKeys = ClientKeys.getKeys();

    const decryptedKey = RSA.decryptMessage(
      res.data,
      clientKeys.priKey,
      clientKeys.pubKey
    );
    console.log(decryptedKey);
    dispatch(setPassSuccess(decryptedKey));
  } catch (e) {
    console.log(e.response.data.error);
    dispatch(setPassError(e.response.data.error));
  }
};
