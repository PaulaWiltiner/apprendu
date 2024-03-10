<template>
  <div>
    <h2 v-if="props.question" class="title">{{ question }}</h2>
    <div class="question-container">
      <div v-html="renderedContent(questionText)" />
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
            <div v-html="renderedContent(option)" />
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
import katex from "katex";
import "katex/dist/katex.min.css";

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

const renderedContent = (value) => {
  const regex = /\$\$(.*?)\$\$/g; // Expressão regular para capturar o conteúdo entre $$
  let replacedContent = value;
  let match;
  while ((match = regex.exec(value)) !== null) {
    const formula = match[1];
    const renderedFormula = katex.renderToString(formula.trim(), {
      throwOnError: false,
    });
    replacedContent = replacedContent.replace(match[0], renderedFormula);
  }
  return replacedContent;
};

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
