<template>
  <button
    class="py-2 px-5 rounded flex text-white font-bold text-center"
    :class="`${
      disabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-sky-700'
    } ${classProp} ${centered ? 'mx-auto' : ''}`"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <span class="w-full">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  props: {
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
  },
};
</script>

<style></style>
