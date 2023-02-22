import { useAuth } from "~~/stores/userAuth";

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuth();
  if (!to.path.includes("auth") && !auth.$state.token) {
    return navigateTo("/auth/login");
  }
});
