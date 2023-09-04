<template>
  <div class="chat-page">
    <h1>ChatGPT Chatroom</h1>
    <GptBackup/>
  </div>
</template>

<script>
import GptBackup from "./GptBackup";

export default {
  components: {
    GptBackup,
  },
};
</script>

<style>
.chat-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
}
</style>
