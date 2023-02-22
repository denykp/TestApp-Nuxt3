<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  type: { type: String, default: "text" },
  name: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  width: { type: String, default: "" },
  height: { type: String, default: "" },
  classProp: { type: String, default: "" },
  maxLen: { type: String, default: "" },
  label: { type: String, default: "" },
  error: { type: String, default: "" },
});
const passwordVisible = ref(false);

const emit = defineEmits(["update:modelValue", "update:validate"]);

const inputValue = useModelWrapper(props, emit, "modelValue");
const inputType = computed(() => {
  switch (props.type) {
    case "password": {
      return passwordVisible.value ? "text" : "password";
    }
    case "number":
    case "phone": {
      return "text";
    }
    default: {
      return props.type;
    }
  }
});

const numbersOnly = (evt: any) => {
  if (props.type === "phone") {
    if (!/\d/g.test(evt.key) || (evt.key === "0" && !props.modelValue)) {
      return evt.preventDefault();
    } else {
      return true;
    }
  } else if (props.type === "number") {
    return !/\d/g.test(evt.key) ? evt.preventDefault() : true;
  }
  return true;
};

const callValidation = () => {
  emit("update:validate");
};
</script>

<template>
  <div class="w-fit mb-2">
    <label v-if="label" :for="props.name" class="font-semibold">{{
      props.label
    }}</label>
    <div
      class="relative"
      :style="`width: ${width || '300px'}; height: ${height || '40px'}`"
    >
      <div
        v-if="type === 'phone'"
        class="font-bold absolute left-2 top-1/2 transform -translate-y-2/3 pt-2"
      >
        62
      </div>
      <input
        v-model="inputValue"
        :type="inputType"
        :name="name"
        class="p-2 border border-gray-300 rounded"
        :class="`${type === 'phone' ? 'pl-8' : ''} ${classProp}`"
        :style="`width: ${width || '300px'}; height: ${height || '40px'}`"
        :placeholder="placeholder"
        :maxlength="maxLen"
        @keypress="numbersOnly"
        @input="callValidation"
        @blur="callValidation"
      />
      <div
        v-if="type === 'password'"
        class="absolute right-2 top-1/2 transform -translate-y-1/2"
      >
        <button tabindex="-1" @click="passwordVisible = !passwordVisible">
          <img
            v-if="passwordVisible"
            src="@/assets/icons/eye_hide.svg"
            alt="eye_hide"
            class="w-6"
          />
          <img
            v-else
            src="@/assets/icons/eye_open.svg"
            alt="eye_hide"
            class="w-6"
          />
        </button>
      </div>
    </div>
    <div
      v-if="error"
      class="text-red-500 text-sm"
      :style="`width: ${width || '300px'}; height: ${height || 'unset'}`"
    >
      {{ error }}
    </div>
  </div>
</template>

<style></style>
