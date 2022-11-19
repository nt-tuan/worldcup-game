const reuseFetch = (method, api, payload) => {
  const token = "";
  const options = {
    method: method,
    headers: {
      authorization: token,
    },
  };
  if (method === "POST") {
    options.body = JSON.stringify(payload);
  }
  return fetch(api, options).then((res) => res.json());
};

const getAPI = (...arg) => reuseFetch("GET", ...arg);
const postAPI = (...arg) => reuseFetch("POST", ...arg);
const putAPI = (...arg) => reuseFetch("PUT", ...arg);

export default { getAPI, postAPI, putAPI };
