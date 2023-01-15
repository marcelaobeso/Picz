import { useDispatch, useSelector } from "react-redux";
import piczApi from "../../api/piczApi";
import { setAlert } from "../../store/slices/alertSlice/alertSlice";
import { addAlert } from "../../store/slices/alertSlice/thunk";
import {
  loginUser,
  logoutUser,
  messageFieldsValidator,
  passwordFieldsValidator,
  signUpUser,
  emailFieldsValidator,
  usernameFieldsValidator,
} from "../../store/slices/signUpSlice/signUpSlice";

export const useAuthStore = () => {
  const { validFields, userInfo } = useSelector((state) => state.signUp);
  const dispatch = useDispatch();

  const loggin = async ({ username, password }) => {
    try {
      const { data } = await piczApi.post("/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        signUpUser({
          ...userInfo,
          firstName: data.firstname,
          lastName: data.lastname,
          gravatar: data.gravatar,
          bio: data.biografy,
          username: username,
          idUser: data.idUser,
          email: data.email,
        })
      );
      dispatch(
        messageFieldsValidator({
          ...validFields,
          message: "",
        })
      );
      dispatch(loginUser());
    } catch (error) {
      dispatch(usernameFieldsValidator({ ...validFields, username: false }));
      dispatch(passwordFieldsValidator({ ...validFields, password: false }));
      dispatch(logoutUser());
      error.response.data.msg
        ? dispatch(setAlert(error.response.data.msg))
        : dispatch(setAlert("unable to connect to server, try again later"));
      dispatch(addAlert());
    }
  };
  const signin = async ({
    email,
    password,
    username,
    firstName,
    lastName,
    idUser,
    bio,
  }) => {
    try {
      const { data } = await piczApi.post("/auth/sign", {
        email,
        password,
        username,
        firstName,
        lastName,
        bio,
        idUser,
        gravatar: "https://",
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        signUpUser({
          ...userInfo,
          firstName: data.firstname,
          lastName: data.lastname,
          gravatar: data.gravatar,
          bio: data.biografy,
          username: username,
          idUser: data.idUser,
          email: data.email,
        })
      );
      dispatch(
        messageFieldsValidator({
          ...validFields,
          message: "",
        })
      );
      dispatch(loginUser());
    } catch (error) {
      dispatch(emailFieldsValidator({ ...validFields, email: false }));
      dispatch(usernameFieldsValidator({ ...validFields, username: false }));
      dispatch(signUpUser({ ...userInfo, username: "", password: "" }));
      console.log(error.response.data.msg);
      error.response.data.msg
        ? dispatch(setAlert(error.response.data.msg))
        : dispatch(
            setAlert(
              "you cannot create an account with this credentials, try with diff email or email"
            )
          );
      dispatch(addAlert());
    }
  };
  const updateUser = async ({
    email,
    password,
    username,
    firstName,
    lastName,
    idUser,
    bio,
  }) => {
    try {
      const { data } = await piczApi.put("/auth/update", {
        email,
        password,
        username,
        firstName,
        lastName,
        bio,
        idUser,
        gravatar: "https://",
      });
      console.log(data);
      dispatch(
        messageFieldsValidator({
          ...validFields,
          message: "",
        })
      );
    } catch (error) {
      dispatch(emailFieldsValidator({ ...validFields, email: false }));
      dispatch(usernameFieldsValidator({ ...validFields, username: false }));
      dispatch(signUpUser({ ...userInfo, username: "", email: "" }));
      console.log(error.response.data.msg);
      error.response.data.msg
        ? dispatch(setAlert(error.response.data.msg))
        : dispatch(
            setAlert(
              "you cannot create an account with this credentials, try with diff email or email"
            )
          );
      dispatch(addAlert());
    }
  };

  const checkToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(logoutUser());
    try {
      const { data } = await piczApi.get("/auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(signUpUser({ ...userInfo, email: data.name, idUser: data.id }));
      dispatch(loginUser());
    } catch (error) {
      localStorage.clear();
      dispatch(logoutUser());
    }
  };

  return {
    loggin,
    signin,
    updateUser,
    checkToken,
  };
};
