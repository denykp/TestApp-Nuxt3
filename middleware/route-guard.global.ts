// import { useAuth } from "~~/stores/userAuth";

export default defineNuxtRouteMiddleware((to) => {
  const access_token = useCookie("access_token", { default: undefined });
  if (!to.path.includes("auth") && !access_token.value) {
    return navigateTo("/auth/login");
  }
});
