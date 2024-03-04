<template>
  <div>
    <h2 class="title mb-4">{{ question }}</h2>
    <div class="d-flex flex-column align-items-start gap-2">
      <button
        v-for="(option, index) in options"
        :key="index"
        type="button"
        class="btn"
        :class="{ 'btn-clicked': selectedOption === option }"
        @click="selectOption(option)"
      >
        <div v-html="renderedContent(option)" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

import katex from "katex";
import "katex/dist/katex.min.css";

const props = defineProps({
  question: String,
  options: Array,
  correctAnswer: String,
  isCorrect: Boolean,
  userAnswer: String,
});

const emits = defineEmits(["update:isCorrect", "update:userAnswer"]);

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

const selectedOption = ref("");

function selectOption(option) {
  selectedOption.value = option;
  checkAnswer();
}

function checkAnswer() {
  const isCorrect = selectedOption.value === props.correctAnswer;
  emits("update:isCorrect", isCorrect);
  emits("update:userAnswer", selectedOption.value);
}
</script>

<style scoped>
.title {
  color: black;
  font-size: 18px;
}

.btn {
  margin-bottom: 10px;
  width: 100%;
  text-align: left;
  border: 1px solid #3f5982;
}

.btn-clicked {
  background-color: #7ec4cf;
  color: white;
}
</style>
