import { useMsal, useMsalAuthentication } from "@azure/msal-react";
import request from "../utils/request";
import decodeJwt from "jwt-decode";
import { useMutation } from "react-query";
import React from "react";

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
  const redirect = async () => {
    await instance.loginRedirect();
    mutate(result.idToken, {
      onSuccess: () => {
        window.location.reload();
      },
    });
  };
  const onLogin = React.useCallback(async () => {
    const response = await instance.acquireTokenSilent({});

    if (response?.idToken) {
      await login(response?.idToken);
      window.location.reload();
    }
  }, [instance]);
  return {
    redirect,
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
  const { instance } = useMsal();
  const isLoggedIn = () => {
    return checkAuth(new Date());
  };
  const logout = async () => {
    localStorage.setItem("token", "");
    localStorage.setItem("token_exp", "");
    await instance.logoutRedirect();
  };

  return {
    logout,
    isLoggedIn,
  };
};
