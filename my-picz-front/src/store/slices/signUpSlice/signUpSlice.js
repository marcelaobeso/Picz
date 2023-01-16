import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie } from "../../../components/utils/cookieFactory";

const initialState = {
  loggedStatus: false,
  userInfo: {
    idUser: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    username: "",
    bio: "",
  },
  validFields: {
    firstName: true,
    lastName: true,
    email: true,
    password: true,
    message: "",
    username: true,
    password2: true,
  },
  viewLogin: false,
  changePassword: false,
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    signUpUser: (state, { payload }) => {
      state.userInfo.firstName = payload.firstName;
      state.userInfo.lastName = payload.lastName;
      state.userInfo.email = payload.email;
      state.userInfo.password = payload.password;
      state.userInfo.password2 = payload.password2;
      state.userInfo.idUser = payload.idUser;
      state.userInfo.username = payload.username;
      state.userInfo.bio = payload.biography;
    },

    logoutUser: (state) => {
      state.userInfo.firstName = "";
      state.userInfo.lastName = "";
      state.userInfo.email = "";
      state.userInfo.password = "";
      state.userInfo.username = "";
      state.userInfo.password2 = "";
      state.userInfo.bio = "";
      state.userInfo.idUser = null;
      state.loggedStatus = false;
      localStorage.clear();
      deleteCookie("UserInfo");
    },

    fristNameFieldsValidator: (state, { payload }) => {
      state.validFields.firstName = payload.firstName;
    },
    lastNameFieldsValidator: (state, { payload }) => {
      state.validFields.lastName = payload.lastName;
    },
    usernameFieldsValidator: (state, { payload }) => {
      state.validFields.username = payload.username;
    },
    emailFieldsValidator: (state, { payload }) => {
      state.validFields.email = payload.email;
    },
    passwordFieldsValidator: (state, { payload }) => {
      state.validFields.password = payload.password;
    },
    password2FieldsValidator: (state, { payload }) => {
      state.validFields.password2 = payload.password2;
    },
    messageFieldsValidator: (state, { payload }) => {
      state.validFields.message = payload.message;
    },
    loginUser: (state, { payload }) => {
      state.loggedStatus = true;
    },
    enableViewLogin: (state) => {
      state.viewLogin = !state.viewLogin;
    },
    enableChangePassword: (state, { payload }) => {
      state.changePassword = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  signUpUser,
  logoutUser,
  enableViewLogin,
  loginUser,
  fristNameFieldsValidator,
  lastNameFieldsValidator,
  emailFieldsValidator,
  passwordFieldsValidator,
  messageFieldsValidator,
  usernameFieldsValidator,
  password2FieldsValidator,
  enableChangePassword,
} = signUpSlice.actions;

export default signUpSlice.reducer;
