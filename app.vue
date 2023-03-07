<template>
  <div>
    <div class="mx-auto">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "./stores/userAuth";

const auth = useAuth();
onMounted(() => {
  auth.getMe();
});
</script>
