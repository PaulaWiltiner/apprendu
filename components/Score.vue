<template>
  <div class="score-container" :style="{ background }">
    <div class="score-content">
      <h1 class="score-title">Pontuação Final</h1>
      <div class="score-value">{{ score }} XP</div>
      <p class="score-message px-3">
        <i class="bi bi-emoji-smile" style="font-size: 24px"></i>
        Parabéns! Continue usando o Apprendu para aprimorar seus conhecimentos e
        progredir.
        <i class="bi bi-emoji-smile" style="font-size: 24px"></i>
      </p>
      <Button @click="goBack" back>Voltar para o módulo</Button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  background: String,
  score: Number,
  route: String,
});

const router = useRouter();

const goBack = () => {
  router.push(props.route);
};
</script>

<style scoped>
.score-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.score-content {
  text-align: center;
  color: white;
}

.score-title {
  font-size: 36px;
  margin-bottom: 20px;
}

.score-value {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
}

.score-message {
  font-size: 18px;
  margin-bottom: 30px;
}

.score-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.score-button:hover {
  background-color: #0056b3;
}
</style>
