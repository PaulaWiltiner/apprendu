<template>
  <div class="game-container">
    <div class="question-container">
      <div v-html="renderedContent(questionText)" />
    </div>
    <div class="fraction-container">
      <!-- Primeira fração -->
      <div class="numerator">
        <div
          v-for="(fraction, index) in userAnswer.fristFraction"
          :key="index"
          class="filled-space--background"
          @click="handleFilledSpaceClick(index)"
        >
          <span class="filled-space__span">{{ fraction }}</span>
          <hr class="divider" v-if="index === 0" />
        </div>
      </div>
      <div class="multiple-sign">x</div>
      <div class="denominator">
        <div
          v-for="(multiplier, index) in userAnswer.fristMultiplier"
          :key="index"
          class="filled-space"
          @click="
            handleFilledSpaceClick(index + userAnswer.fristFraction.length)
          "
        >
          {{ multiplier }}
        </div>
      </div>

      <div class="equal-sign">=</div>

      <!-- Segunda fração -->
      <div class="numerator">
        <div
          v-for="(fraction, index) in userAnswer.secondFraction"
          :key="index"
          class="filled-space--background"
          @click="
            handleFilledSpaceClick(
              index +
                userAnswer.fristFraction.length +
                userAnswer.fristMultiplier.length
            )
          "
        >
          <span class="filled-space__span">{{ fraction }}</span>
          <hr class="divider" v-if="index === 0" />
        </div>
      </div>
      <div class="multiple-sign">x</div>
      <div class="denominator">
        <div
          v-for="(multiplier, index) in userAnswer.secondMultiplier"
          :key="index"
          class="filled-space"
          @click="
            handleFilledSpaceClick(
              index +
                userAnswer.fristFraction.length +
                userAnswer.fristMultiplier.length +
                userAnswer.secondFraction.length
            )
          "
        >
          {{ multiplier }}
        </div>
      </div>

      <!-- Resultado -->
      <div class="equal-sign">=</div>
      <div class="result">
        <div
          v-for="(result, index) in userAnswer.result"
          :key="index"
          class="filled-space"
          @click="
            handleFilledSpaceClick(
              index +
                userAnswer.fristFraction.length +
                userAnswer.fristMultiplier.length +
                userAnswer.secondFraction.length +
                userAnswer.secondMultiplier.length
            )
          "
        >
          {{ result }}
        </div>
      </div>
    </div>

    <div class="options-container">
      <transition-group name="slide" tag="div" class="options-wrapper">
        <div
          v-for="(option, index) in props.options"
          :key="index"
          class="option-card"
          @click="handleCardClick(option, index)"
        >
          <Card
            v-if="!option.clicked"
            :width="option.width"
            :height="option.height"
            :background="option.background"
            class="option-card"
          >
            {{ option.text }}
          </Card>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import Card from "@/components/Card.vue";
import katex from "katex";
import "katex/dist/katex.min.css";

const props = defineProps({
  options: Array,
  questionText: String,
  correctAnswer: Object,
  userAnswer: Object,
});

const emits = defineEmits(["update:isCorrect", "update:userAnswer"]);

const userAnswer = ref({
  fristFraction: props.correctAnswer.fristFraction,
  fristMultiplier: [null],
  secondFraction: [null, null],
  secondMultiplier: [null],
  result: [null],
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

const handleCardClick = (selectedOption, index) => {
  const nextEmptySpaceIndex = findNextEmptySpace();

  if (nextEmptySpaceIndex !== -1) {
    // Marca o card como clicado para não ser mais exibido na área de opções
    selectedOption.clicked = true;
    // Atualiza o espaço vazio na fração com o valor do card clicado
    switch (nextEmptySpaceIndex) {
      case 0:
        userAnswer.value.fristFraction[0] = selectedOption.text;
        break;
      case 1:
        userAnswer.value.fristFraction[1] = selectedOption.text;
        break;
      case 2:
        userAnswer.value.fristMultiplier[0] = selectedOption.text;
        break;
      case 3:
        userAnswer.value.secondFraction[0] = selectedOption.text;
        break;
      case 4:
        userAnswer.value.secondFraction[1] = selectedOption.text;
        break;
      case 5:
        userAnswer.value.secondMultiplier[0] = selectedOption.text;
        break;
      case 6:
        userAnswer.value.result[0] = selectedOption.text;
        break;
    }
  } else {
    console.log("Não há espaço vazio para preencher.");
  }
};

const handleFilledSpaceClick = (index) => {
  const spaceValue = userAnswer.value.fristFraction.concat(
    userAnswer.value.fristMultiplier,
    userAnswer.value.secondFraction,
    userAnswer.value.secondMultiplier,
    userAnswer.value.result
  )[index];
  if (spaceValue !== null) {
    const clickedOption = props.options.find(
      (option) => option.text === spaceValue && option.clicked
    );
    if (clickedOption) {
      clickedOption.clicked = false;
      switch (index) {
        case 0:
        case 1:
          userAnswer.value.fristFraction[index] = null;
          break;
        case 2:
          userAnswer.value.fristMultiplier[0] = null;
          break;
        case 3:
        case 4:
          userAnswer.value.secondFraction[index - 3] = null;
          break;
        case 5:
          userAnswer.value.secondMultiplier[0] = null;
          break;
        case 6:
          userAnswer.value.result[0] = null;
          break;
      }
    }
  }
};

const findNextEmptySpace = () => {
  const fristFractionEmpty = userAnswer.value.fristFraction.includes(null);
  const fristMultiplierEmpty = userAnswer.value.fristMultiplier.includes(null);
  const secondFractionEmpty = userAnswer.value.secondFraction.includes(null);
  const secondMultiplierEmpty =
    userAnswer.value.secondMultiplier.includes(null);
  const resultEmpty = userAnswer.value.result.includes(null);

  if (fristFractionEmpty)
    return userAnswer.value.fristFraction.findIndex((item) => item === null);
  if (fristMultiplierEmpty)
    return (
      userAnswer.value.fristMultiplier.findIndex((item) => item === null) +
      userAnswer.value.fristFraction.length
    );
  if (secondFractionEmpty)
    return (
      userAnswer.value.secondFraction.findIndex((item) => item === null) +
      userAnswer.value.fristFraction.length +
      userAnswer.value.fristMultiplier.length
    );
  if (secondMultiplierEmpty)
    return (
      userAnswer.value.secondMultiplier.findIndex((item) => item === null) +
      userAnswer.value.fristFraction.length +
      userAnswer.value.fristMultiplier.length +
      userAnswer.value.secondFraction.length
    );
  if (resultEmpty)
    return (
      userAnswer.value.result.findIndex((item) => item === null) +
      userAnswer.value.fristFraction.length +
      userAnswer.value.fristMultiplier.length +
      userAnswer.value.secondFraction.length +
      userAnswer.value.secondMultiplier.length
    );
  return -1; // Se não houver espaços vazios
};

watch(userAnswer.value, (answer) => {
  const isCorrect =
    JSON.stringify(answer) === JSON.stringify(props.correctAnswer);
  console.log(isCorrect, "isCorrect");
  emits("update:isCorrect", isCorrect);
  emits("update:userAnswer", answer);
});
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fraction-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 120px;
}

.numerator,
.denominator,
.result {
  width: 100%;
}

.multiple-sign,
.equal-sign {
  width: auto;
  padding: 6px;
}

.divider {
  width: 100%;
  padding: 6px;
  border-top: 2px solid #000;
  margin: 8px 0px 0px 0px;
}

.filled-space {
  width: 100%; /* ou outra porcentagem desejada */
  height: auto;
  min-height: 50px;
  border: 1px solid #f9dac1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  padding: 4px;
}

.filled-space--background {
  width: 100%; /* ou outra porcentagem desejada */
  height: auto;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.filled-space__span {
  border: 1px solid #f9dac1;
  padding: 4px;
  width: 100%;
  min-height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.options-container {
  margin-top: 28px;
}

.options-container div {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.option-card {
  margin: 5px;
  font-size: 13px;
  display: block;
  display: inline-block; /* Adicionando esta propriedade para colocar os cards lado a lado */
}

.filled-space--font {
  font-size: calc(10px + 0.2vw);
}

/* Animação */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease-in-out;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(-50px);
}
.slide-enter-to,
.slide-leave {
  transform: translateY(0);
}
.question-container {
  color: black;
  font-size: 14px;
}
</style>
