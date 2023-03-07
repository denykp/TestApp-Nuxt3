<script setup lang="ts">
const route = useRoute();
const otpValue = ref(Array(4).fill(""));

const verify = () => {
  console.log("hit");
};

const inputRef = ref<HTMLInputElement[]>(Array(4).fill(null));

// const inputRef = ref(null);

// const currentInput = ref<number>(0);

const goNext = (
  evt: InputEvent & { target?: HTMLInputElement },
  idx: number
) => {
  // const a = document
  //   .querySelector<HTMLInputElement>(
  //     `input[name=input-otp-${currentInput.value}]`
  //   )
  //   ?.focus();
  console.log(inputRef.value[idx]);
  if (inputRef.value[idx + 1]) {
    inputRef.value[idx + 1].focus();
  } else {
    inputRef.value[idx].blur();
  }

  // if (evt.data) {
  //   console.log("masuk if");

  //   (
  //     evt.target?.parentElement?.parentElement
  //       ?.nextElementSibling as HTMLElement
  //   )?.focus();
  // }
};
</script>

<template>
  <NuxtLayout name="auth-layout">
    <div id="title" class="mb-4 flex justify-center text-xl">OTP</div>
    <div class="flex w-[400px] justify-center gap-2">
      <v-input
        v-for="(_, index) in otpValue"
        :ref="(el) => (inputRef[index] = (el as any).inputRef)"
        :name="`input-otp-${index}`"
        v-model="otpValue[index]"
        type="number"
        width="40px"
        max-len="1"
        class-prop="text-center"
        class="text-center"
        @input="goNext($event, index)"
      ></v-input>
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

    <FormButton class="mt-4 mx-auto" @click="verify">Register</FormButton>
  </NuxtLayout>
</template>
