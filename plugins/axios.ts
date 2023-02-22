import axios from "axios";
export default defineNuxtPlugin(() => {
  let api = axios.create({
    // baseURL: defaultUrl,
    headers: {
      common: {},
    },
  });
  return {
    provide: {
      api: api,
    },
  };
});
