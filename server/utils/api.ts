export const useApi: any = async <T>(url: string, options: any) => {
  console.log(url.replace(/^\/api/, ""));
  return await $fetch(url.replace(/^\/api/, ""), {
    ...options,
    baseURL: process.env.SERVER_BASE_URL,
  });
};
