import { userApi } from "../../api/userApi";

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await userApi.get("/refresh", {
      withCredentials: true,
    });

    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
