import { defineStore } from "pinia";
import axios from "axios";

export interface registerData extends loginData {
  country: string;
}

export const useAuth = defineStore("auth", {
  state: () => ({
    userData: {},
    token: "",
  }),
  actions: {
    async login(payload: loginData) {
      const { data } = await axios.post("/api/login", payload);
      if (data.data) {
        console.log(data);
      }
    },
    async register(payload: registerData) {
      const { data } = await axios.post("/api/register", payload);
      if (data.data) {
        console.log(data);
      }
    },
  },
});
