<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  centered: {
    type: Boolean,
    default: false,
  },
  classProp: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "button",
  },
});

const emit = defineEmits(["click"]);

const onClick = () => {
  console.log("click component");
  emit("click");
};
</script>

<template>
  <button
    class="py-2 px-5 rounded flex text-white font-bold text-center"
    :class="`${
      disabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-sky-700'
    } ${classProp} ${centered ? 'mx-auto' : ''}`"
    :disabled="disabled"
    :type="type"
    @click="$emit('click')"
  >
    <span class="w-full">
      <slot />
    </span>
  </button>
</template>

<style></style>
