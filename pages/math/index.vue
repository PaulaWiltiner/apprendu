<template>
  <div class="app-home">
    <Header>Matemática</Header>
    <ScrollableCards>
      <div class="d-flex align-items-center justify-content-center">
        <Card
          v-for="card in cardOne"
          :width="card.width"
          :height="card.height"
          :background="card.background"
          :shadow="card.shadow"
          :padding-top="14"
          :padding-bottom="14"
          :clickable="true"
          to="/math/functions"
          center
        >
          <p class="full">{{ card.description }}</p>
          <img :src="card.img" :alt="card.description" style="height: 50px" />
        </Card>
      </div>
      <div class="d-flex align-items-center justify-content-center gap-4">
        <Card
          v-for="card in cardsLine2"
          :width="card.width"
          :height="card.height"
          :background="card.background"
          :shadow="card.shadow"
          center
        >
          <p class="full">{{ card.description }}</p>
          <img :src="card.img" :alt="card.description" style="height: 50px" />
        </Card>
      </div>
      <div class="d-flex align-items-center justify-content-center">
        <Card
          v-for="card in cardTwo"
          :width="card.width"
          :height="card.height"
          :background="card.background"
          :shadow="card.shadow"
          :clickable="true"
          center
        >
          <p class="full">{{ card.description }}</p>
          <img :src="card.img" :alt="card.description" style="height: 50px" />
        </Card>
      </div>
      <div class="d-flex align-items-center justify-content-center gap-4">
        <Card
          v-for="card in cardsLine4"
          :width="card.width"
          :height="card.height"
          :background="card.background"
          :shadow="card.shadow"
          center
        >
          <p class="full">{{ card.description }}</p>
          <img :src="card.img" :alt="card.description" style="height: 50px" />
        </Card>
      </div>
      <div class="d-flex align-items-center justify-content-center gap-4">
        <Card
          v-for="card in cardsLine5"
          :width="card.width"
          :height="card.height"
          :background="card.background"
          :shadow="card.shadow"
          center
        >
          <p class="full">{{ card.description }}</p>
          <img :src="card.img" :alt="card.description" style="height: 50px" />
        </Card>
      </div>
    </ScrollableCards>
    <Footer justify="right"></Footer>
    <NuxtPage />
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
  title?: string;
  description: string;
  img: string;
}

const cardOne = ref<Card[]>([
  {
    width: "100px",
    height: "90px",
    background: "linear-gradient(45deg, #c3a5c2, #7ec4cf)",
    shadow: true,
    description: "Funções",
    img: "/img/1.png",
  },
]);

const cardTwo = ref<Card[]>([
  {
    width: "100px",
    height: "90px",
    background: "linear-gradient(45deg, #c3a5c2, #7ec4cf)",
    shadow: true,
    description: "Finanças",
    img: "/img/6.png",
  },
]);

const cardsLine2 = ref<Card[]>([
  {
    width: "100px",
    height: "90px",
    background: "linear-gradient(45deg, #c3a5c2, #7ec4cf)",
    shadow: true,
    description: "Geometria",
    img: "/img/2.png",
  },
  {
    width: "100px",
    height: "90px",
    background: "linear-gradient(45deg, #c3a5c2, #7ec4cf)",
    shadow: true,
    description: "Operações",
    img: "/img/3.png",
  },
]);

const cardsLine4 = ref<Card[]>([
  {
    width: "100px",
    height: "90px",
    background: "linear-gradient(45deg, #c3a5c2, #7ec4cf)",
    shadow: true,
    description: "Trigonometria",
    img: "/img/4.png",
  },
  {
    width: "100px",
    height: "90px",
    background: "linear-gradient(45deg, #c3a5c2, #7ec4cf)",
    shadow: true,
    description: "Probabilidade",
    img: "/img/5.png",
  },
]);

const cardsLine5 = ref<Card[]>([
  {
    width: "100px",
    height: "90px",
    background: "linear-gradient(45deg, #c3a5c2, #7ec4cf)",
    shadow: true,
    description: "Geometria",
    img: "/img/2.png",
  },
  {
    width: "100px",
    height: "90px",
    background: "linear-gradient(45deg, #c3a5c2, #7ec4cf)",
    shadow: true,
    description: "Operações",
    img: "/img/3.png",
  },
]);
</script>

<style scoped>
.full {
  height: 10px;
  font-size: 14px;
}
</style>
