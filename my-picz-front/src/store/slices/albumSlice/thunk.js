import piczApi from "../../../api/piczApi";
import { setAlert } from "../alertSlice/alertSlice";
import { addAlert } from "../alertSlice/thunk";
import { setAlbums, setRelationships } from "./albumSlice";

//upload a single picture along with its information
export const getAlbum = () => {
  return async (dispatch, getState) => {
    const idUser = getState().signUp.userInfo.idUser;

    try {
      const { data } = await piczApi.get("/upload/album", {
        params: { idUser: idUser },
      });
      console.log(data.albums);
      data && dispatch(setAlbums(data.albums));
    } catch (error) {
      console.log(error);
      typeof error.response.data.msg === String
        ? dispatch(setAlert(error.response.data.msg))
        : dispatch(setAlert("unable to get albums for this user."));
      dispatch(addAlert());
    }
  };
};

export const linkToAlbum = (id_album, id_photo) => {
  return async (dispatch, getState) => {
    const info = { id_photo: id_photo, id_album: id_album };

    try {
      const { data } = await piczApi.post(`/upload/album`, info);
      console.log(data.msg);
      data && dispatch(addAlert());
      data && dispatch(setAlert(data.msg));
    } catch (error) {
      console.log(error.response.data.msg);
      typeof error.response.data.msg == "string"
        ? dispatch(setAlert(error.response.data.msg))
        : dispatch(setAlert("unable to link photo to this album"));
      dispatch(addAlert());
    }
  };
};

export const linkAndCreateAlbum = (id_photo, name) => {
  return async (dispatch, getState) => {
    const idUser = getState().signUp.userInfo.idUser;
    const info = { id_photo: id_photo, name: name, idUser: idUser };
    try {
      const { data } = await piczApi.post(`/upload/newAlbum`, info);
      console.log(data.msg);
      data && dispatch(addAlert());
      data && dispatch(setAlert(data.msg));
    } catch (error) {
      console.log(error);
      typeof error.response.data.msg == "string"
        ? dispatch(setAlert(error.response.data.msg))
        : dispatch(setAlert("unable to link photo to this album"));
      dispatch(addAlert());
    }
  };
};
