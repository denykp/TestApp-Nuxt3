export default defineEventHandler(async (event) => {
  const reqBody = await readBody(event);
  const { data } = await useApi("/api/register", {
    method: "post",
    body: reqBody,
  });

  useRouter().push({
    path: `/auth-otp/62${reqBody.phone}`,
    query: { user_id: data.data.user.id },
  });

  return {
    status: 200,
    statusMessage: "Register success",
    data,
  };
});
