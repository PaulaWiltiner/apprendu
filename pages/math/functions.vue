<template>
  <div v-if="!isScore" class="app-home">
    <Header>Funções</Header>
    <ScrollableCards>
      <Content v-if="isContent" v-bind="contents[currentContentIndex]" />
      <Progress v-if="!isContent" :progress="progress" />
      <component
        v-if="!isContent"
        :is="questions[currentQuestionIndex].type"
        v-bind="questions[currentQuestionIndex].props"
        v-model:is-correct="questions[currentQuestionIndex].isCorrect"
        v-model:user-answer="questions[currentQuestionIndex].userAnswer"
      />
      <notifications
        classes="notification"
        position="bottom right"
        width="100%"
        @destroy="closeNotification"
      >
        <template v-slot:default="{ notification }">
          <div class="custom-notification">
            <div class="py-3">{{ notification.title }}</div>
            <br />
            <div>{{ notification.text }}</div>
          </div>
        </template>
      </notifications>
    </ScrollableCards>
    <Footer
      :justify="!isContent ? 'center' : hasPrevious ? 'space-between' : 'right'"
    >
      <Button
        v-if="!isContent"
        @click="handleAnswer"
        :disabled="loading"
        :loading="loading"
        confirm
      >
        <p v-if="!loading" class="no-padding">Confirmar</p>
      </Button>
      <Button
        v-if="isContent && hasPrevious"
        @click="previousContent"
        previous
      ></Button>
      <Button v-if="isContent" @click="nextContent" next></Button>
    </Footer>
  </div>
  <Score
    v-else
    :score="score"
    route="/home"
    background="linear-gradient(45deg, #c3a5c2, #7ec4cf)"
  />
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import ScrollableCards from "@/components/ScrollableCards.vue";
import Footer from "@/components/Footer.vue";
import Progress from "@/components/Progress.vue";
import Score from "@/components/Score.vue";
import Content from "@/components/Content.vue";
import { useAI } from "@/composables/AIExplanation";
import { useNotification } from "@kyvg/vue3-notification";

const { getAIExplanation } = useAI();
const loading = ref<boolean>(false);

async function getAI(prompt: string) {
  return await getAIExplanation(prompt);
}
const { notify } = useNotification();

const isContent = ref(true);
const currentContentIndex = ref(0);
const hasPrevious = computed(() => currentContentIndex.value > 0);

const contents = reactive([
  {
    title: "A Torre Eiffel foi construída para a Exposição Mundial de 1889",
    textTop:
      "A Torre Eiffel, um ícone icônico de Paris, foi originalmente construída como a peça central da Exposição Mundial de 1889, realizada em Paris para celebrar o centenário da Revolução Francesa. Projetada pelo engenheiro Gustave Eiffel, essa estrutura de ferro fundido se tornou um dos pontos turísticos mais famosos do mundo.",
    textBottom:
      "A imagem abaixo mostra a majestosa Torre Eiffel em todo o seu esplendor.",
    imageUrl: "/img/torre-eiffel.jpg",
    textColorTop: "#735096",
    fontSizeTop: 14,
    fontSizeBottom: 14,
    isBoldTop: true,
    isBoldBottom: false,
  },
  {
    title: "As Pirâmides do Egito foram construídas há mais de 4.000 anos",
    textTop:
      "As antigas Pirâmides do Egito, como a Grande Pirâmide de Gizé, são algumas das estruturas mais antigas do mundo. Elas foram construídas há mais de 4.000 anos e ainda hoje são um testemunho impressionante das habilidades arquitetônicas dos antigos egípcios.",
    textBottom:
      "A imagem abaixo mostra a imponência das Pirâmides de Gizé sob o sol do Egito.",
    imageUrl: "/img/piramides-egito.jpeg",
    textColorTop: "#f39c76",
    fontSizeTop: 14,
    fontSizeBottom: 14,
    isBoldTop: true,
    isBoldBottom: false,
  },
  {
    title: "O Burj Khalifa é o edifício mais alto do mundo",
    textTop:
      "Localizado em Dubai, nos Emirados Árabes Unidos, o Burj Khalifa é o edifício mais alto do mundo, atingindo uma altura incrível de mais de 828 metros. Ele se destaca por sua arquitetura moderna e é uma maravilha da engenharia contemporânea.",
    textBottom:
      "A imagem abaixo destaca a grandiosidade do Burj Khalifa em meio à paisagem urbana de Dubai.",
    imageUrl: "/img/burj-khalifa.jpg",
    textColorTop: "#3f5982",
    fontSizeTop: 14,
    fontSizeBottom: 14,
    isBoldTop: true,
    isBoldBottom: false,
  },
]);

function nextContent() {
  if (currentContentIndex.value === contents.length - 1) {
    isContent.value = false;
  }
  if (currentContentIndex.value < contents.length - 1) {
    currentContentIndex.value++;
  }
}

function previousContent() {
  if (currentContentIndex.value > 0) {
    currentContentIndex.value--;
  }
}

function generatePrompt(
  questionCommand: any,
  correctAnswer: any,
  userAnswer: any,
  options?: any
) {
  let prompt = "";

  if (questions[currentQuestionIndex.value].isCorrect) {
    prompt = `Preciso que dê uma curiosidade sobre a questão que o estudante acertou em no máximo 65 caracteres, seguindo o contexto: a questão é ${questionCommand}, ${
      options ? "opções: " + options : ""
    } a resposta correta é ${correctAnswer} e a resposta do estudante foi ${userAnswer}.Use na resposta 'Curiosidade: '`;
  } else {
    prompt = `Dê uma pista criativa e sucinta para auxiliar o estudante na questão em até 65 caracteres, sem revelar a resposta direta, com base nas informações: ${questionCommand}, ${
      options ? "opções: " + options : ""
    }, resposta correta: ${correctAnswer}, resposta do estudante: ${userAnswer}. Inclua 'Dica:' na resposta.`;
  }

  return prompt;
}

function closeNotification() {
  if (questions[currentQuestionIndex.value].isCorrect) {
    if (questions[currentQuestionIndex.value].userAnswerIsCorrect) {
      correctQuestions.value.push(currentQuestionIndex.value);
    }
    if (
      currentQuestionIndex.value === questions.length - 1 &&
      questions[currentQuestionIndex.value].isCorrect
    ) {
      isScore.value = true;
    }
    if (currentQuestionIndex.value < questions.length - 1) {
      currentQuestionIndex.value++;
    }
  }
  loading.value = false;
}

const correctOrder = ref([
  "Primeiro",
  "Segundo",
  "Terceiro",
  "Quarto",
  "Quinto",
]);

const order = ref(["Terceiro", "Primeiro", "Quarto", "Segundo", "Quinto"]);

const isScore = ref(false);

const items = reactive([
  {
    img1: "/img/android.svg",
    text2: "android",
  },
  {
    img1: "/img/apple.png",
    text2: "apple",
  },
  {
    img1: "/img/mcdonalds.png",
    text2: "mcdonalds",
  },
  {
    img1: "/img/google.png",
    text2: "google",
  },
]);

const correctMatch = ref([
  {
    leftCardIndex: 0,
    rightCardIndex: 0,
  },
  {
    leftCardIndex: 1,
    rightCardIndex: 1,
  },
  {
    leftCardIndex: 2,
    rightCardIndex: 2,
  },
  {
    leftCardIndex: 3,
    rightCardIndex: 3,
  },
]);

const questions = reactive([
  {
    isAssociationQuestion: true,
    type: defineAsyncComponent({
      loader: () => import("@/components/AssociationQuestion.vue"),
    }),
    props: {
      options: items.map((item) => ({
        ...item,
        isStretching: false,
        startX: null,
        startY: null,
        endX: null,
        endY: null,
        lineStyle: {
          width: "5px",
          transform: "rotate(0deg)",
          transformOrigin: "0% 0%",
        },
      })),
      questionText: "Ligue os pontos corretamente",
      correctAnswer: correctMatch.value,
      background: "#9f98ba",
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 1,
    userAnswer: null,
  },
  {
    type: defineAsyncComponent({
      loader: () => import("@/components/TrueFalseQuestion.vue"),
    }),
    props: {
      question: "Analise a sentença abaixo:",
      questionText: "A água ferve a 100°C.",
      correctAnswer: "true",
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 7,
    userAnswer: "",
  },
  {
    type: defineAsyncComponent({
      loader: () => import("@/components/OrderQuestion.vue"),
    }),
    props: {
      questionText: "Ordene corretamente na vertical",
      correctAnswer: correctOrder.value,
      options: order.value,
      background: "linear-gradient(45deg, #c3a5c2, #7ec4cf)",
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 2,
    userAnswer: null,
  },
  {
    type: defineAsyncComponent({
      loader: () => import("@/components/FillInTheBlankQuestion.vue"),
    }),
    props: {
      question: "Complete a frase:",
      questionText:
        "O DNA é a sigla para Ácido Desoxirribonucleico, uma molécula que carrega a informação genética em ______.",
      answerType: "text",
      correctAnswer: "organismos",
      options: ["animais", "vegetais", "organismos", "microorganismos"],
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 5,
    userAnswer: null,
  },
  {
    type: defineAsyncComponent({
      loader: () => import("@/components/MultipleChoice.vue"),
    }),
    props: {
      question: "Qual é a capital do Brasil?",
      options: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"],
      correctAnswer: "Brasília",
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 8,
    userAnswer: null,
  },
  {
    type: defineAsyncComponent({
      loader: () => import("@/components/FillInTheBlankQuestion.vue"),
    }),
    props: {
      question: "Preencha o espaço em branco com o ano:",
      questionText:
        "A Declaração de Independência dos Estados Unidos foi assinada em ______.",
      answerType: "number",
      correctAnswer: "1776",
    },
    isCorrect: false,
    userAnswerIsCorrect: true,
    weight: 3,
    userAnswer: null,
  },
]);

let currentQuestionIndex = ref(0);
let correctQuestions = ref<number[]>([]);

const progress = computed(
  () => ((currentQuestionIndex.value + 1) / questions.length) * 100
);

async function handleAnswer() {
  loading.value = true;
  const questionText = `${
    questions[currentQuestionIndex.value].props.question ?? " "
  } ${questions[currentQuestionIndex.value].props.questionText ?? " "}`;
  let _correctAnswer =
    questions[currentQuestionIndex.value].props.correctAnswer;
  let _options = questions[currentQuestionIndex.value].props.options;
  if (questions[currentQuestionIndex.value].isAssociationQuestion) {
    _options = items.map((item) => JSON.stringify(item));
    _correctAnswer = correctMatch.value.map(
      ({ leftCardIndex, rightCardIndex }) => {
        const leftItem =
          items[leftCardIndex].img1 ?? items[leftCardIndex].text1;
        const rightItem =
          items[rightCardIndex].img2 ?? items[rightCardIndex].text2;
        return JSON.stringify({
          leftItem,
          rightItem,
        });
      }
    );
  }
  const prompt = generatePrompt(
    questionText,
    _correctAnswer,
    questions[currentQuestionIndex.value].userAnswer,
    questions[currentQuestionIndex.value].props.options
  );

  const text: string = await getAI(prompt);
  if (questions[currentQuestionIndex.value].isCorrect) {
    notify({
      title: "Parabéns!!",
      text: text ?? "",
      type: "success",
      duration: 10000,
      speed: 1000,
    });
  } else {
    questions[currentQuestionIndex.value].userAnswerIsCorrect = false;
    notify({
      title: "Não foi dessa vez, tente novamente.",
      text: text ?? "",
      type: "error",
      duration: 10000,
      speed: 1000,
    });
  }
}

function calculateScore(correctQuestions: number[]) {
  console.log(correctQuestions, "correctQuestions");
  let totalWeight = 0;

  for (const index of correctQuestions) {
    if (index >= 0 && index < questions.length) {
      const question = questions[index];
      if (question.hasOwnProperty("weight")) {
        const weight = question.weight;
        totalWeight += weight;
      }
    }
  }

  if (totalWeight === 0) {
    return 0;
  }

  return totalWeight;
}

const score = computed(() => calculateScore(correctQuestions.value));
</script>

<style>
.no-padding {
  padding: 0px;
  margin: 0px;
}
.notification {
  margin: 0 5px 5px;
  padding: 10px;
  font-size: 12px;
  color: #ffffff;
  height: 90px;

  background: #fc7e44;
  border-left: 5px solid #187fe7;

  &.success {
    background: #5dc27d;
    border-left-color: #188b39;
  }

  &.warn {
    background: linear-gradient(45deg, #f39c76, #e5b9a8);
    border-left-color: #f48a06;
  }

  &.error {
    background: #f88884;
    border-left-color: #e54d42;
  }

  .btn-orange {
    background: linear-gradient(45deg, #f39c76, #e5b9a8);
  }
  .btn-purple {
    background: linear-gradient(45deg, #735096, #a8a1c5);
  }
  .btn-blue {
    background: linear-gradient(45deg, #3f5982, #7ec4cf);
  }
  .btn-other {
    background: linear-gradient(45deg, #c3a5c2, #7ec4cf);
  }
}
</style>
