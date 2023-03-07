import { defineStore } from "pinia";
import axios from "axios";

interface IVerifyOtp {
  user_id: string;
  otp_code: string;
}

export const useAuth = defineStore("auth", {
  state: () => ({
    userData: {},
  }),
  actions: {
    async verifyOtp(payload: IVerifyOtp) {
      const { data } = await useApi<ApiResponse<UserResponse>>(
        "/api/register/otp/match",
        {
          method: "post",
          body: payload,
        }
      );
      const access_token = useCookie("access_token", { default: undefined });
      if (data.user) {
        access_token.value = data.user.access_token;
      }
    },
    async getMe() {
      const { data } = await useApi<ApiResponse<UserResponse>>(
        "/api/profile/me"
      );
      if (data.user) {
        this.userData = data.user;
      }
    },
  },
});
