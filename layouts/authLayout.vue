<template>
  <div
    class="flex justify-center items-center bg-gradient-to-br from-sky-700 to-sky-300 relative"
    style="height: 100vh; width: 100vw"
  >
    <!-- <div class="auth-bg absolute right-0 bottom-0 opacity-25">
      <img
        src="@/assets/icons/many-circle.png"
        alt="many-circle"
        width="300"
        height="300"
      />
    </div> -->
    <div class="bg-gray-100 rounded-xl p-10">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
