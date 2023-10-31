<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

setTimeout(() => {
  router.push({ name: "home" });
}, 4000);
</script>

<template>
  <div class="welcome">
    <div class="container text-center">
      <img class="img" src="/img/welcome.gif" alt="GIF" />
    </div>
  </div>
</template>

<style scoped>
.welcome {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #faf7ef; /* Cor de fundo de sua escolha */
}

.img {
  max-width: 100%;
  width: 100%;
  max-height: 100%;
  height: 100%;
}
</style>
