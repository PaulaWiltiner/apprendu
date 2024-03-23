<template>
  <div class="app-home">
    <Header />
    <ScrollableCards>
      <Card
        v-for="card in cards"
        :width="card.width"
        :height="card.height"
        :background="card.background"
        :shadow="card.shadow"
        :clickable="card.clickable"
        :to="card.to"
      >
        <h3 class="title">{{ card.title }}</h3>
        <p :class="card.text1 ? 'text1' : 'text'">{{ card.description }}</p>
      </Card>

      <div class="cardsLeft">
        <Card
          v-for="card in cardsTwo"
          :width="card.width"
          :height="card.height"
          :background="card.background"
          :shadow="card.shadow"
          :clickable="card.clickable"
          :to="card.to"
        >
          <h3 class="title">{{ card.title }}</h3>
          <p class="text">{{ card.description }}</p>
        </Card>
      </div>

      <Card
        v-for="card in cardsThree"
        :width="card.width"
        :height="card.height"
        :background="card.background"
        :shadow="card.shadow"
        :clickable="card.clickable"
        :to="card.to"
      >
        <h3 class="title">{{ card.title }}</h3>
        <p class="text">{{ card.description }}</p>
      </Card>
    </ScrollableCards>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import ScrollableCards from "@/components/ScrollableCards.vue";
import Footer from "@/components/Footer.vue";

interface Card {
  width: string;
  height: string;
  background?: string;
  shadow: boolean;
  title: string;
  description: string;
  clickable: boolean;
  to: string;
  text1?: boolean;
}

const cards = ref<Card[]>([
  {
    width: "100%",
    height: "200px",
    background: "url(/img/student.png)",
    shadow: true,
    title: "Apprendu",
    description: "Estude de forma divertida e prática",
    clickable: false,
    to: "",
    text1: true,
  },
  {
    width: "48%",
    height: "100%",
    background: "linear-gradient(45deg, #678ac9, #7ec4cf)",
    shadow: true,
    title: "Matemática",
    description: "Acesse já! Se divirta com uma matemática descomplicada.",
    clickable: true,
    to: "/math",
  },
  {
    width: "44%",
    height: "100%",
    background: "linear-gradient(45deg, #f39c76, #e5b9a8)",
    shadow: false,
    title: "Português",
    description: "Conteúdos e jogos sobre gramática e muito mais.",
    clickable: false,
    to: "",
  },
]);

const cardsTwo = ref<Card[]>([
  {
    width: "100%",
    height: "100%",
    background: "linear-gradient(45deg, #ea8d5a, #f7ace4)",
    shadow: false,
    title: "Diversão",
    description: "Aprenda de forma divertida e interativa",
    clickable: false,
    to: "",
  },
  {
    width: "100%",
    height: "100%",
    background: "linear-gradient(45deg, #9266be, #bcb0e8)",
    shadow: false,
    title: "Contexto",
    description: "Veja como usar o aprendizado no seu dia",
    clickable: false,
    to: "",
  },
]);

const cardsThree = ref<Card[]>([
  {
    width: "40%",
    height: "200px",
    background: "url(/img/apprendu.svg)",
    shadow: false,
    title: "",
    description: "",
    clickable: false,
    to: "",
  },
  {
    width: "100%",
    height: "200px",
    background: "url(/img/celebration.svg)",
    shadow: false,
    title: "Realize o seu sonho!",
    description: "Nós estamos aqui para ajudá-lo a alcançar os seus sonhos.",
    clickable: false,
    to: "",
  },
]);
</script>

<style scoped>
.title {
  white-space: nowrap;
  font-size: 18px;
}

.text1 {
  font-size: 14px;
  width: 130px;
  color: #fff;
}

.text {
  font-size: 14px;
  color: #fff;
}

.cardsLeft {
  width: 54%;
  padding: 0px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
