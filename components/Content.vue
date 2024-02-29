<template>
  <div ref="content" class="content-with-image">
    <div v-html="renderedContent" />
  </div>
</template>

<script setup>
import { defineProps, onMounted } from "vue";
import katex from 'katex';
import 'katex/dist/katex.min.css';

const props = defineProps({
  content: String,
});

const renderedContent = computed(() => {
  const regex = /\$\$(.*?)\$\$/g; // Expressão regular para capturar o conteúdo entre $$
  let replacedContent = props.content;
  let match;
  while ((match = regex.exec(props.content)) !== null) {
    const formula = match[1];
    const renderedFormula = katex.renderToString(formula.trim(), { throwOnError: false });
    replacedContent = replacedContent.replace(match[0], renderedFormula);
  }
  return replacedContent;
});

</script>

<style scoped>
.content-with-image {
  color: #000;
  margin-top: 32px;
}
</style>
