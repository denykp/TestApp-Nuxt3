<template>
  <div class="flex justify-center">
    <div class="p-10">
      <div
        v-for="(item, index) in messages"
        :key="index"
        class="border border-gray-500 rounded-xl py-2 px-4 w-96 mt-5"
      >
        <div class="flex justify-between">
          <div class="font-bold">{{ item.user_sender.name }}</div>
          <div>{{ item.created_at }}</div>
        </div>
        <hr class="border-gray-400" />
        <div>{{ item.message }}</div>
      </div>
      <!-- {{ messages }} -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      user_id: '',
    }
  },
  async mounted() {
    this.user_id = localStorage.getItem('user_id')
    await this.getMessages()
  },
  methods: {
    async getMessages() {
      try {
        const { data } = await this.$axios.get(`/api/message/${this.user_id}`)
        if (data.data) {
          this.messages = data.data.chat
        }
      } catch {
        this.$toast.global.error()
      }
    },
  },
}
</script>

<style>
</style>