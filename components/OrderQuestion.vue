<template>
  <h2 class="title">{{ props.question }}</h2>
  <draggable v-model="meals" tag="ul" class="draggable" item-key="meal">
    <template #item="{ element: meal }">
      <Card
        :width="card.width"
        :background="card.background"
        :shadow="card.shadow"
        :circle="card.circle"
        :padding-bottom="card.paddingBottom"
        :padding-top="card.paddingTop"
      >
        <p class="card-text text">{{ meal }}</p>
      </Card>
    </template>
  </draggable>
</template>

<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";

const props = defineProps({
  correctOrder: Array, // Recebe a ordem correta dos itens
  order: Array,
  question: String,
  isCorrect: Boolean,
  background: String,
});

const card = ref({
  id: 1,
  width: 100,
  background:
    props.background ?? "linear-gradient(135deg, #ffafbd 0%, #ffc3a0 100%)",
  shadow: true,
  circle: true,
  paddingBottom: 10,
  paddingTop: 10,
});

const emits = defineEmits(["update:isCorrect"]);

const meals = ref(props.order);
watch(
  () => meals.value,
  (newMeals) => {
    const isCorrect = newMeals.every(
      (element, index) => element === props.correctOrder[index]
    );
    emits("update:isCorrect", isCorrect);
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
}

.draggable > div {
  margin-top: 15px;
}
</style>
