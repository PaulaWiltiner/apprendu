<template>
  <h2 class="title">{{ props.questionText }}</h2>
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
        <p class="card-text text">{{ option }}</p>
      </Card>
    </template>
  </draggable>
</template>

<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";

const props = defineProps({
  correctAnswer: Array, // Recebe a ordem correta dos itens
  options: Array,
  questionText: String,
  isCorrect: Boolean,
  background: String,
  userAnswer: Array,
});

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
