import { createSlice } from "@reduxjs/toolkit";
import http from "../api/httpService";
import api from "../api/constants";
import CryptoJS from "crypto-js";

// Slice
const slice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    message: {},
    loading: true,
    error: "",
    errors: false,
  },
  reducers: {
    sendMsgSuccess: (state, action) => {
      state.messages = [...state.messages, action.payload];
      state.loading = false;
      state.errors = false;
    },
    sendMsgError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.errors = true;
    },
    getMsgsSuccess: (state, action) => {
      state.messages = action.payload;
      state.loading = false;
      state.errors = false;
    },
    getMsgsError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.errors = true;
    },
  },
});
export default slice.reducer;
// Actions
const {
  sendMsgSuccess,
  sendMsgError,
  getMsgsSuccess,
  getMsgsError,
} = slice.actions;

export const sendMessage = (msg, key) => async (dispatch) => {
  try {
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(msg, key).toString();
    const res = await http.post(`${api.SEND_MESSAGE}`, { text: ciphertext });
    const decryptedMsg = {
      ...res.data,
      text: CryptoJS.AES.decrypt(res.data.text, key).toString(
        CryptoJS.enc.Utf8
      ),
    };
    dispatch(sendMsgSuccess(decryptedMsg));
  } catch (e) {
    dispatch(sendMsgError(e.response.data.error));
  }
};
export const getMessages = (key) => async (dispatch) => {
  try {
    const res = await http.get(`${api.GET_MESSSAGES}`);
    let msgs = res.data;
    msgs = msgs.map((msg) => ({
      ...msg,
      text: CryptoJS.AES.decrypt(msg.text, key).toString(CryptoJS.enc.Utf8),
    }));
    dispatch(getMsgsSuccess(msgs));
  } catch (e) {
    dispatch(getMsgsError(e.response.data.error));
  }
};
