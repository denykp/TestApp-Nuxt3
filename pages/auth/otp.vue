<script setup lang="ts">
import { useAuth } from "~~/stores/userAuth";

const route = useRoute();
const otpValue = ref(Array(4).fill(null));

const auth = useAuth();

const inputRef = ref<HTMLInputElement[]>(Array(4).fill(null));

const goNext = (
  evt: InputEvent & { target?: HTMLInputElement },
  idx: number
) => {
  if (evt.data && inputRef.value[idx]) {
    if (inputRef.value[idx + 1]) {
      inputRef.value[idx + 1].focus();
    } else {
      inputRef.value[idx].blur();
    }
  }
  errors.value = [];
};

const errors = ref<string[]>([]);

const verify = async () => {
  if (otpValue.value.join("").length === 4) {
    await auth.verifyOtp({
      user_id: route.query.user_id?.toString() || "",
      otp_code: otpValue.value.join(""),
    });

    await auth.getMe();
    navigateTo("/");
  } else {
    errors.value.push("Please input OTP");
  }
};
</script>

<template>
  <NuxtLayout name="auth-layout">
    <div id="title" class="mb-4 flex justify-center text-xl">OTP</div>
    <div class="flex w-[400px] justify-center gap-2">
      <form-input
        v-for="(_, index) in otpValue"
        :ref="(el) => (inputRef[index] = (el as any)?.inputRef)"
        v-model="otpValue[index]"
        type="number"
        width="40px"
        max-len="1"
        class-prop="text-center"
        class="text-center"
        @input="goNext($event, index)"
      ></form-input>
      <!-- <v-input
        ref="inputRef"
        type="number"
        width="40px"
        :max-len="1"
        class-prop="text-center"
        class="text-center"
        @input="goNext($event)"
      ></v-input> -->
    </div>

    <div
      v-if="errors.length"
      class="w-[300px] rounded p-2 text-red-500 border-red-500 border bg-white mx-auto"
    >
      {{ errors.join(", ") }}
    </div>

    <FormButton class="mt-4 mx-auto" @click="verify">Verify</FormButton>
  </NuxtLayout>
</template>
