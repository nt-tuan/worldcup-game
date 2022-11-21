import { checkAuth, getToken as _getToken } from "../components/useAuth";
import { msalInstance } from "./msal";

const getToken = async () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 10);
  if (checkAuth(now)) {
    return _getToken();
  }
  // window.location.reload();
  return "";
};

const reuseFetch = async (method, api, payload) => {
  const tokenResponse = await getToken();

  const options = {
    method: method,
    headers: {
      Authorization: tokenResponse,
    },
  };

  if (method === "POST") {
    options.body = JSON.stringify(payload);
  }
  const res = await fetch(`${import.meta.env.VITE_API}${api}`, options);
  if (res.status === 201) return;
  if (res.status === 401) {
    window.location.reload();
    return;
  }
  return res.json();
};

const getAPI = (...arg) => reuseFetch("GET", ...arg);
const postAPI = (...arg) => reuseFetch("POST", ...arg);
const putAPI = (...arg) => reuseFetch("PUT", ...arg);

export default { getAPI, postAPI, putAPI };
