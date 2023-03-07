import type { UseFetchOptions } from "#app";
import type { NitroFetchRequest, NitroFetchOptions } from "nitropack";
import type { KeyOfRes } from "nuxt/dist/app/composables/asyncData";
import { useAuth } from "~~/stores/userAuth";

export const useApi = async <T>(
  url: string,
  options?:
    | NitroFetchOptions<
        NitroFetchRequest,
        | "post"
        | "get"
        | "head"
        | "patch"
        | "put"
        | "delete"
        | "connect"
        | "options"
        | "trace"
      >
    | undefined
) => {
  const auth = useAuth();
  // const config = useRuntimeConfig();

  return await $fetch<T>(url, {
    ...options,
    onRequest({ options }) {
      const access_token = useCookie("access_token", { default: undefined });

      options.headers = new Headers(options.headers);
      if (access_token.value)
        options.headers.set("Authorization", access_token.value.toString());
    },
  });
};
