export const useApi: any = async <T>(url: string, options: any) => {
  console.log(url, options);
  const config = useRuntimeConfig();

  return await $fetch(url, {
    ...options,
  });
};
