import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login/Login";
import { Dashboard } from "../components/Dashboard";
import Signin from "../components/auth/Signin/Signin";
import { useAuthStore } from "../components/hooks/useAuthStore";
import { useEffect } from "react";
import { Profile } from "../components/profile/Profile";
import { ProfileForm } from "../components/profile/ProfileForm";
import { AlbumView } from "../components/picture/album/AlbumView";

const AppRouter = () => {
  const { loggedStatus, viewLogin } = useSelector((state) => state.signUp);
  const { checkToken } = useAuthStore();
  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Routes>
      {loggedStatus === false ? (
        viewLogin ? (
          <>
            <Route path="/auth/login/*" element={<Login />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
          </>
        ) : (
          <>
            <Route path="/auth/sign/*" element={<Signin />} />
            <Route path="/*" element={<Navigate to="/auth/sign" />} />
          </>
        )
      ) : (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/album" element={<AlbumView />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileForm />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
