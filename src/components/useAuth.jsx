import { useMsal } from "@azure/msal-react";
import request from "../utils/request";
import decodeJwt from "jwt-decode";
import { useMutation } from "react-query";

export const login = async (token) => {
  const { accessToken } = await request.postAPI("/login", { token });
  const { exp } = decodeJwt(accessToken);
  localStorage.setItem("token", accessToken);
  localStorage.setItem("token_exp", exp);
  return accessToken;
};

export const useLogin = () => {
  const { instance } = useMsal();
  const { mutate, isLoading } = useMutation(login);
  const onLogin = async () => {
    const result = await instance.loginPopup();
    mutate(result.idToken, {
      onSuccess: () => {
        window.location.reload();
      },
    });
  };
  return {
    onLogin,
    isLoading,
  };
};

export const getToken = () => {
  const accessToken = localStorage.getItem("token");
  return accessToken;
};

export const checkAuth = (time) => {
  const accessToken = getToken();
  const exp = localStorage.getItem("token_exp");
  if (!accessToken || !exp) {
    return false;
  }
  return parseInt(exp) >= time.getTime() / 1000;
};

export const useAuth = () => {
  const isLoggedIn = () => {
    return checkAuth(new Date());
  };
  const logout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("token_exp", "");
    window.location.reload();
  };

  return {
    logout,
    isLoggedIn,
  };
};
