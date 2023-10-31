<template>
  <div>
    <h2 class="title">{{ question }}</h2>
    <div class="question-container">
      {{ questionText }}
      <div v-if="answerType === 'text'" class="mt-4">
        <select
          v-model="userAnswer"
          :style="{ borderColor: '#f39c76' }"
          class="form-select form-control-lg"
          @change="checkAnswer"
        >
          <option
            v-for="(option, index) in options"
            :style="{ color: '#f39c76' }"
            :key="index"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
      <div v-else-if="answerType === 'number'" class="mt-4">
        <input
          type="number"
          v-model.number="userAnswer"
          class="form-control"
          :style="{ borderColor: '#f39c76' }"
          @input="checkAnswer"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  question: String,
  questionText: String,
  answerType: String, // 'text' ou 'number'
  correctAnswer: String, // Resposta correta
  isCorrect: Boolean,
  options: {
    type: Array,
    default: [], // Valor padrão para quando answerType !== 'text'
  },
  userAnswer: String,
});

const emits = defineEmits(["update:isCorrect", "update:userAnswer"]);

const userAnswer = ref("");

function checkAnswer() {
  const isCorrect =
    userAnswer.value.toString().toLowerCase() ===
    props.correctAnswer.toString().toLowerCase();
  emits("update:isCorrect", isCorrect);
  emits("update:userAnswer", userAnswer.value.toString().toLowerCase());
}
</script>

<style scoped>
.title {
  color: #f39c76;
  font-size: 18px;
}

.question-container {
  margin-top: 20px;
  color: black;
}

.form-control {
  width: 100%;
}
</style>
