import piczApi from "../../../api/piczApi";
import { setAlert } from "../alertSlice/alertSlice";
import { addAlert } from "../alertSlice/thunk";
import { allPictures, clearPictureInfo } from "./pictureSlice";

//upload a single picture along with its information
export const savePicture = (file) => {
  return async (dispatch, getState) => {
    const formData = new FormData();
    formData.append("file", file);

    const idUser = getState().signUp.userInfo.idUser;
    const { photoInfo } = getState().picture;
    const info = {
      ...photoInfo,
      idUser: idUser,
    };
    formData.append("info", JSON.stringify(info));

    try {
      const { data } = await piczApi.post("/upload/picture", formData);
      console.log(data);
    } catch (error) {
      console.log(error);
      typeof error.response.data.msg === String
        ? dispatch(setAlert(error.response.data.msg))
        : dispatch(
            setAlert("unable to add this picture, try with a different one")
          );
      dispatch(addAlert());
    }
    dispatch(clearPictureInfo());
    dispatch(getAllPictures());
  };
};

// get all the pictures available for this user
export const getAllPictures = () => {
  return async (dispatch, getState) => {
    const { idUser } = getState().signUp.userInfo;

    try {
      const { data } = await piczApi.get(`/upload/picture`, {
        params: { idUser: idUser },
      });
      console.log(data.photos);
      dispatch(allPictures(data.photos));
    } catch (error) {
      console.log(error);
      error.response && typeof error.response.data.msg === String
        ? dispatch(setAlert(error.response.data.msg))
        : dispatch(setAlert("unable to retrieve pictures for this user"));
      dispatch(addAlert());
    }
  };
};
