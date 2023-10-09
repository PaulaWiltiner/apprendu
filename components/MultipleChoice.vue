<template>
  <div>
    <p>{{ question }}</p>
    <div class="btn-group" role="group">
      <button
        v-for="(option, index) in options"
        :key="index"
        :class="{
          'btn btn-primary': selectedOption === option,
          'btn btn-secondary': selectedOption !== option,
        }"
        @click="selectedOption = option"
      >
        {{ option }}
      </button>
    </div>
    <button @click="checkAnswer">Verificar</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  question: String,
  options: Array,
  correctAnswer: String,
});

const selectedOption = ref("");

const checkAnswer = () => {
  const isCorrect = selectedOption.value === props.correctAnswer;
  emit("answer", isCorrect);
};
</script>

<style scoped>
/* Adicione estilos Bootstrap ou estilos personalizados aqui conforme necessário */
</style>
