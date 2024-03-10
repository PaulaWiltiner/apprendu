<template>
  <div>
    <h2 class="title mb-5"><div v-html="renderedContent(question)" /></h2>
    <div class="card-container">
      <Card
        width="100%"
        height="auto"
        :background="cardBackground"
        color="white"
        :shadow="false"
      >
        <div v-html="renderedContent(questionText)" />
      </Card>
      <div class="btn-group mt-2" role="group">
        <button
          type="button"
          class="btn btn-true"
          :class="{ active: selectedOption === 'true' }"
          @click="selectOption('true')"
        >
          Verdadeiro
        </button>
        <button
          type="button"
          class="btn btn-false"
          :class="{ active: selectedOption === 'false' }"
          @click="selectOption('false')"
        >
          Falso
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

import katex from "katex";
import "katex/dist/katex.min.css";

const props = defineProps({
  questionText: String,
  question: String,
  correctAnswer: String,
  isCorrect: Boolean,
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

const selectedOption = ref("");

function selectOption(option) {
  selectedOption.value = option;
  const isCorrect = selectedOption.value === props.correctAnswer;
  emits("update:isCorrect", isCorrect);
  emits("update:userAnswer", selectedOption.value);
}

const cardBackground = ref("#f39c76");
</script>

<style scoped>
.title {
  color: black;
  font-size: 18px;
}

.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.btn-group {
  display: flex;
  gap: 10px;
}

.btn-true,
.btn-false {
  width: 100px;
  text-align: center;
  transition: background-color 0.3s ease;
  background-color: #f6ecd2; /* Cor de preenchimento inicial para ambos os botões */
}
.btn-true.active,
.btn-false.active {
  background-color: #7ec4cf;
  color: white;
}
</style>
