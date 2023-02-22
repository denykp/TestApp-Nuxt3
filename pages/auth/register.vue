<script setup lang="ts">
import { useAuth } from "@/stores/userAuth";
import { InferType, number, object, string } from "yup";

definePageMeta({
  title: "Register",
});

const layout = "auth-layout";

const auth = useAuth();

const registerSchema = object({
  phone: string().required(),
  password: string().required(),
  password_verify: string().required().equals(["password"]),
  country: string().required(),
  latlong: string(),
  device_token: string(),
  device_type: number()
    .required()
    .test("type", "Must be 0 or 1 or 2", (val) =>
      [0, 1, 2].includes(val || -1)
    ),
});

type registerData = InferType<typeof registerSchema>;

const formField = ref<registerData>({
  phone: "",
  password: "",
  password_verify: "",
  country: "",
  latlong: "0",
  device_token: "0",
  device_type: 2,
});

const login = async () => {
  try {
    useFetch("/api/auth/register", { body: formField });
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <NuxtLayout :name="layout">
    <FormInput type="phone" v-model="formField.phone" />
    <FormInput type="password" v-model="formField.password" />
    <FormInput type="password" v-model="formField.password_verify" />
    <FormInput v-model="formField.country" />

    <pre>
      {{ JSON.stringify(formField, null, 2) }}
    </pre>

    <FormButton class="mt-4 mx-auto" @click="login">Login</FormButton>
  </NuxtLayout>
</template>
