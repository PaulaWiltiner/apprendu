<template>
  <h3 class="title"><div v-html="renderedContent(questionText)" /></h3>
  <draggable v-model="items" tag="ul" class="draggable" item-key="meal">
    <template #item="{ element: option }">
      <Card
        :width="card.width"
        :height="card.height"
        :background="card.background"
        :shadow="card.shadow"
        :circle="card.circle"
        :padding-bottom="card.paddingBottom"
        :padding-top="card.paddingTop"
        center
      >
        <p class="card-text text"><div v-html="renderedContent(option)" /></p>
      </Card>
    </template>
  </draggable>
</template>

<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";
import katex from "katex";
import "katex/dist/katex.min.css";

const props = defineProps({
  correctAnswer: Array, // Recebe a ordem correta dos itens
  options: Array,
  questionText: String,
  isCorrect: Boolean,
  background: String,
  userAnswer: Array,
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

const card = ref({
  width: "100%",
  height: "auto",
  background:
    props.background ?? "linear-gradient(135deg, #ffafbd 0%, #ffc3a0 100%)",
  shadow: true,
  circle: true,
  paddingBottom: 10,
  paddingTop: 10,
});

const emits = defineEmits(["update:isCorrect", "update:userAnswer"]);

const items = ref(props.options);
watch(
  () => items.value,
  (newOptions) => {
    const isCorrect = newOptions.every(
      (element, index) => element === props.correctAnswer[index]
    );
    emits("update:isCorrect", isCorrect);
    emits("update:userAnswer", newOptions);
  }
);
</script>

<style scoped>
.title {
  color: black;
  font-size: 18px;
}

.text {
  font-size: 13px;
  color: #fff;
}

.draggable > div {
  margin-top: 15px;
}
</style>
