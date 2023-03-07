<script setup lang="ts">
import { useForm } from "vee-validate";
import { InferType, number, object, string, ref } from "yup";

definePageMeta({
  title: "Register",
});

const router = useRouter();

const layout = "auth-layout";

const registerSchema = object({
  phone: string().required(),
  password: string().required(),
  password_verify: string()
    .required()
    .equals([ref("password")], "Password is different"),
  country: string().required(),
});

const { handleSubmit, errors } = useForm<InferType<typeof registerSchema>>({
  validationSchema: registerSchema,
});

// type registerData = InferType<typeof registerSchema>;

// const formField = ref<registerData>({
//   phone: "",
//   password: "",
//   password_verify: "",
//   country: "",
// });

const register = handleSubmit(
  async (values: InferType<typeof registerSchema>) => {
    try {
      console.log(values);
      const { password_verify, ...others } = values;
      // await useFetch("/api/auth/register");
      const { data } = await useApi("/api/register", {
        method: "post",
        body: { ...others, latlong: "0", device_token: "0", device_type: 2 },
      });

      console.log(data);

      if (data.user) {
        router.push({
          path: "/auth/otp",
          query: {
            user_id: data.user.id,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
);
</script>

<template>
  <NuxtLayout :name="layout">
    <div id="title" class="mb-4 flex justify-center text-xl">Register</div>
    <v-input name="phone" type="phone" placeholder="Phone" max-len="15" />
    <v-input name="password" type="password" placeholder="Password" />
    <v-input
      name="password_verify"
      type="password"
      placeholder="Verify Password"
    />
    <v-input name="country" placeholder="Country" />

    <div
      v-if="Object.keys(errors).length"
      class="w-[300px] rounded p-2 text-red-500 border-red-500 border bg-white"
    >
      {{ Object.values(errors).join(", ") }}
    </div>

    <FormButton class="mt-4 mx-auto" @click="register">Register</FormButton>
  </NuxtLayout>
</template>
