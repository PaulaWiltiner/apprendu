<template>
  <div class="app-home">
    <Header />
    <ScrollableCards>
      <Progress :progress="50" />
      <!-- Substitua 50 pelo valor desejado -->
      <!-- <Card
        v-for="card in cards"
        :width="card.width"
        :height="card.height"
        :background="card.background"
        :shadow="card.shadow"
      >
        <h3>{{ card.title }}</h3>
        <p>{{ card.description }}</p>
      </Card> -->
      <!-- <OrderQuestion
        v-model:is-correct="isCorrect"
        :question="question"
        :correctOrder="correctOrder"
        :order="order"
        background="linear-gradient(45deg, #c3a5c2, #7ec4cf)"
      /> -->
      <AssociationQuestion
        :items="items"
        :correctMatch="correctMatch"
        question="Ligue os pontos corretamente"
        v-model:is-correct="isCorrect"
      />

      <!-- <MultipleChoice
        question="escolha"
        :options="['ola', 'hei']"
        correctAnswer="ola"
      ></MultipleChoice> -->

      <notifications
        classes="notification"
        position="bottom right"
        width="100%"
      />
    </ScrollableCards>
    <Footer><Button @click="handleAnswer"></Button></Footer>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import ScrollableCards from "@/components/ScrollableCards.vue";
import Footer from "@/components/Footer.vue";
import Progress from "@/components/Progress.vue";
import OrderQuestion from "@/components/OrderQuestion.vue";
import MultipleChoice from "@/components/MultipleChoice.vue";
import AssociationQuestion from "@/components/AssociationQuestion.vue";

import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

const correctOrder = [
  "Hamburger",
  "Pizza",
  "Spaghetti",
  "Tacos",
  "Teriyaki Chicken",
];

const order = ["Pizza", "Hamburger", "Spaghetti", "Teriyaki Chicken", "Tacos"];

const isCorrect = ref(false);
const question = ref("Ordene as comidas");

function handleAnswer() {
  console.log("pass");
  console.log(isCorrect.value, "value");
  if (isCorrect.value) {
    notify({
      title: "This is the <em>title</em>",
      text: "This is some <b>content</b>",
      type: "success",
      duration: 10000,
      speed: 1000,
    });
  } else {
    notify({
      title: "This is the <em>title</em>",
      text: "This is some <b>content</b>",
      type: "error",
      duration: 10000,
      speed: 1000,
    });
  }
}

const items = reactive([
  {
    text1: "text 0",
    text2: "text 0",
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
  },
  {
    text1: "text 1",
    text2: "text 1",
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
  },
  {
    text1: "text 2",
    text2: "text 2",
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
  },
  {
    text1: "text 3",
    text2: "text 3",
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
  },
]);

const correctMatch = ref([
  {
    leftCardIndex: 0,
    rightCardIndex: 2,
  },
  {
    leftCardIndex: 1,
    rightCardIndex: 0,
  },
  {
    leftCardIndex: 2,
    rightCardIndex: 1,
  },
  {
    leftCardIndex: 3,
    rightCardIndex: 3,
  },
]);

interface Card {
  id: number;
  width: number;
  height: number;
  background?: string;
  shadow: boolean;
  title: string;
  description: string;
}

const cards = ref<Card[]>([
  {
    id: 1,
    width: 300,
    height: 200,
    background: "linear-gradient(135deg, #ffafbd 0%, #ffc3a0 100%)",
    shadow: true,
    title: "Card 1",
    description: "Conteúdo do Card 1",
  },
  {
    id: 2,
    width: 400,
    height: 300,
    background: "lightblue",
    shadow: true,
    title: "Card 2",
    description: "Conteúdo do Card 2",
  },
  {
    id: 3,
    width: 200,
    height: 150,
    background: "linear-gradient(45deg, #c3a5c2, #7ec4cf);",
    shadow: false,
    title: "Card 3",
    description: "Conteúdo do Card 3",
  },
  // Adicione mais cards com tamanhos variáveis conforme necessário
]);
</script>

<style>
.notification {
  margin: 0 5px 5px;
  padding: 10px;
  font-size: 12px;
  color: #ffffff;
  height: 90px;

  background: #fc7e44;
  border-left: 5px solid #187fe7;

  &.success {
    background: linear-gradient(45deg, #c3a5c2, #7ec4cf);
    border-left-color: #42a85f;
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
    background: linear-gradient(45deg, #735096, #9388ba);
  }
  .btn-blue {
    background: linear-gradient(45deg, #3f5982, #7ec4cf);
  }
  .btn-other {
    background: linear-gradient(45deg, #c3a5c2, #7ec4cf);
  }
}
</style>
