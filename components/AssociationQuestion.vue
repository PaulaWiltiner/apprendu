<template>
  <div>
    <h2 class="title">{{ props.questionText }}</h2>

    <div class="d-flex wid" v-for="(item, index) in props.options" :key="index">
      <Card
        :width="card.width"
        :height="card.height"
        :background="card.background"
        :shadow="card.shadow"
        :padding-bottom="card.paddingBottom"
        :padding-top="card.paddingTop"
        :padding-left="card.paddingLeft"
        :padding-right="card.paddingRight"
        :has-button="card.hasButton"
        center
      >
        <p v-if="item.text1" class="card-text text">{{ item.text1 }}</p>
        <img v-if="item.img1" :src="item.img1" class="card-image" />
        <template #button>
          <button
            type="button"
            class="btn btn-purple rounded-5"
            @mousedown="(event) => startStretching(index, event)"
          >
            <div class="elastic-line-container">
              <div class="elastic-line rounded-5" :style="item.lineStyle"></div>
            </div>
          </button>
        </template>
      </Card>

      <Card
        :width="card.width"
        :height="card.height"
        :background="card.background"
        :shadow="card.shadow"
        :padding-bottom="card.paddingBottom"
        :padding-top="card.paddingTop"
        :padding-left="card.paddingLeft"
        :padding-right="card.paddingRight"
        :has-button="card.hasButton"
        is-left
        center
      >
        <p v-if="item.text2" class="card-text text">{{ item.text2 }}</p>
        <img v-if="item.img2" :src="item.img2" class="card-image" />
        <template #button>
          <button
            type="button"
            class="btn btn-right rounded-5"
            @mouseup="(event) => stopStretching(index, event)"
            ref="rightButton"
          ></button>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  correctAnswer: Array,
  options: Array,
  questionText: String,
  isCorrect: Boolean,
  background: String,
  useAnswer: Array,
});

const card = ref({
  id: 1,
  width: "auto",
  height: "auto",
  background:
    props.background ?? "linear-gradient(135deg, #ffafbd 0%, #ffc3a0 100%)",
  shadow: false,
  circle: false,
  paddingBottom: 10,
  paddingTop: 10,
  paddingLeft: 16,
  paddingRight: 16,
  hasButton: true,
});

const rightButton = ref();
const connectedPairs = ref([]);
const leftIndex = ref();

// Variáveis para armazenar as coordenadas
let leftButtonCoords = { startX: null, startY: null };
let rightButtonCoords = { startX: null, startY: null };

const startStretching = (index, event) => {
  props.options[index].isStretching = true;
  leftButtonCoords.startX = getClientX(event);
  leftButtonCoords.startY = getClientY(event);
  leftIndex.value = index;
};

const stopStretching = (index, event) => {
  props.options[index].isStretching = false;
  rightButtonCoords.startX = getClientX(event);
  rightButtonCoords.startY = getClientY(event);

  const leftCardIndex = leftIndex.value;
  const rightCardIndex = index;

  const isCorrectPair = checkCorrectPair(leftCardIndex, rightCardIndex);

  if (isCorrectPair) {
    addConnectedPair(leftCardIndex, rightCardIndex);
  }

  stretchLine(leftCardIndex);
};

// ...

const checkCorrectPair = (leftCardIndex, rightCardIndex) => {
  // Implemente a lógica para verificar se o par é correto com base em seus índices
  // Por exemplo, compare com a lista props.correctAnswer

  const correctAnswer = props.correctAnswer;
  if (
    correctAnswer &&
    correctAnswer.some(
      (pair) =>
        (pair.leftCardIndex === leftCardIndex &&
          pair.rightCardIndex === rightCardIndex) ||
        (pair.leftCardIndex === rightCardIndex &&
          pair.rightCardIndex === leftCardIndex)
    )
  ) {
    return true;
  }

  return false;
};

const addConnectedPair = (leftCardIndex, rightCardIndex) => {
  // Verifica se o par já está na lista
  if (
    !connectedPairs.value.some(
      (pair) =>
        (pair.leftCardIndex === leftCardIndex &&
          pair.rightCardIndex === rightCardIndex) ||
        (pair.leftCardIndex === rightCardIndex &&
          pair.rightCardIndex === leftCardIndex)
    )
  ) {
    // Adiciona o par à lista
    connectedPairs.value.push({ leftCardIndex, rightCardIndex });
  }
};

const stretchLine = (index) => {
  if (
    leftButtonCoords.startX !== null &&
    leftButtonCoords.startY !== null &&
    rightButtonCoords.startX !== null &&
    rightButtonCoords.startY !== null
  ) {
    const deltaX = rightButtonCoords.startX - leftButtonCoords.startX;
    const deltaY = rightButtonCoords.startY - leftButtonCoords.startY;

    const newWidth = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const angleRad = Math.atan2(deltaY, deltaX);
    const angleDeg = (angleRad * 180) / Math.PI;

    // Atualize a linha com as coordenadas calculadas
    props.options[index].lineStyle = {
      width: `${newWidth}px`,
      transform: `rotate(${angleDeg}deg)`,
      transformOrigin: "0% 0%",
    };
  }
};
const getClientX = (event) => {
  if (event.type.startsWith("touch")) {
    return event.touches[0].clientX;
  }
  return event.clientX;
};
const getClientY = (event) => {
  if (event.type.startsWith("touch")) {
    return event.touches[0].clientY;
  }
  return event.clientY;
};

const emits = defineEmits(["update:isCorrect", "update:userAnswer"]);
watch(connectedPairs.value, (newArray) => {
  const isCorrect = newArray.every(
    (element, index) =>
      element.leftCardIndex === props.correctAnswer[index].leftCardIndex &&
      element.rightCardIndex === props.correctAnswer[index].rightCardIndex
  );
  emits("update:isCorrect", true);
  emits(
    "update:userAnswer",
    newArray.map(({ leftCardIndex, rightCardIndex }) => {
      const leftItem =
        props.options[leftCardIndex].img1 ?? props.options[leftCardIndex].text1;
      const rightItem =
        props.options[rightCardIndex].img2 ??
        props.options[rightCardIndex].text2;
      return JSON.stringify({
        leftItem,
        rightItem,
      });
    })
  );
});
</script>

<style scoped>
.card-image {
  width: 40px;
  height: 40px;
}
.elastic-line-container {
  position: relative;
  width: 100%;
  height: 12px;
  cursor: pointer;
}

.wid {
  width: 100%;
  margin-top: 20px;
  justify-content: space-between;
}

.title {
  color: black;
  font-size: 18px;
}

.btn-purple {
  width: 3%;
  background: #735096;
}
.btn-right {
  z-index: 2;
  height: 25px;
  background: #735096;
}
.btn-blue {
  z-index: 2;
  background: linear-gradient(45deg, #3f5982, #7ec4cf);
}
.text {
  font-size: 13px;
  text-align: center;
  width: 60px;
}

.elastic-line {
  background: linear-gradient(45deg, #c3a5c2, #7ec4cf); /* Cor da linha */
  height: 12px;
  position: absolute;
  z-index: -4;
  top: 0;
}
</style>
