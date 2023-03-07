<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

definePageMeta({
  title: "Login",
});

const layout = "auth-layout";

const formField = ref<loginData>({
  phone: "",
  password: "",
  latlong: "0",
  device_token: "0",
  device_type: 2,
});

const rules = {
  phone: { required },
  password: { required },
};

const v$ = useVuelidate(rules, formField);

const login = async () => {
  try {
    v$.value.$validate();
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <NuxtLayout :name="layout">
    <div class="mb-4 flex justify-center text-xl">Login</div>
    <label>
      <FormInput
        placeholder="Phone"
        v-model="formField.phone"
        :error="v$.phone.$errors.map((val) => val.$message).join(',')"
      />
    </label>
    <FormInput
      placeholder="Password"
      type="password"
      v-model="formField.password"
      :error="v$.phone.$errors.map((val) => val.$message).join(',')"
    />

    <FormButton class="mt-4 mx-auto" @click="login">Login</FormButton>
    <div class="mt-4 flex justify-center">
      doesn't have account?&nbsp;
      <NuxtLink to="/auth/register" class="text-blue-400">create one</NuxtLink>
    </div>
  </NuxtLayout>
</template>
