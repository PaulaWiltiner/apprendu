<template>
  <div>
    <h2 class="title">{{ props.questionText }}</h2>

    <div class="d-flex wid" v-for="(item, index) in props.options" :key="index">
      <button
        type="button"
        class="btn btn-purple rounded-3 shadow format"
        @touchstart="(event) => startStretching(index, event)"
        @touchend="stopStretching(index)"
        @touchmove="(event) => stretchLine(index, event)"
      >
        <p v-if="item.text1" class="card-text text">{{ item.text1 }}</p>
        <img v-if="item.img1" :src="item.img1" class="card-image" />
      </button>

      <div class="elastic-line-container">
        <div class="elastic-line rounded-5" :style="item.lineStyle"></div>
      </div>

      <button
        type="button"
        class="btn btn-right rounded-3 shadow format"
        ref="rightButton"
      >
        <p v-if="item.text2" class="card-text text">{{ item.text2 }}</p>
        <img v-if="item.img2" :src="item.img2" class="card-image" />
      </button>
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
  userAnswer: Array,
});

const rightButton = ref();

const connectedPairs = ref([]);
const startStretching = (index, event) => {
  event.preventDefault();
  event.stopPropagation();
  props.options[index].isStretching = true;
  connectedPairs.value.splice(
    0,
    connectedPairs.value.length,
    ...connectedPairs.value.filter((item) => item.leftCardIndex !== index)
  );
  if (!props.options[index].startX) {
    props.options[index].startX = getClientX(event);
    props.options[index].endX = getClientX(event);
    props.options[index].startY = getClientY(event);
    props.options[index].endY = getClientY(event);
  }
};

const stopStretching = (index) => {
  for (const [key, button] of rightButton.value.entries()) {
    const lineRect = button.getBoundingClientRect();

    const mouseX = props.options[index].endX;
    const mouseY = props.options[index].endY;
    if (
      mouseX >= lineRect.left &&
      mouseX <= lineRect.right &&
      mouseY >= lineRect.top &&
      mouseY <= lineRect.bottom
    ) {
      props.options[index].startX = mouseX;
      props.options[index].endX = mouseX;
      props.options[index].startY = mouseY;
      props.options[index].endY = mouseY;
      connectedPairs.value.push({
        leftCardIndex: index,
        rightCardIndex: key,
      });
      break;
    } else if (key === props.options.length - 1) {
      const newWidth = 0;
      props.options[index].lineStyle = {
        width: `${newWidth + 2}px`,
        transform: `rotate(0deg)`,
        transformOrigin: "0% 0%",
      };
      props.options[index].isStretching = false;
      props.options[index].startX = null;
      props.options[index].endX = null;
      props.options[index].startY = null;
      props.options[index].endY = null;
    }
  }
};

const stretchLine = (index, event) => {
  if (props.options[index].isStretching) {
    event.preventDefault();
    event.stopPropagation();
    props.options[index].endX = getClientX(event);
    props.options[index].endY = getClientY(event);
    const rote = calcularRotacao(
      props.options[index].startX,
      props.options[index].startY,
      props.options[index].endX,
      props.options[index].endY
    );
    const newWidth = Math.sqrt(
      Math.pow(props.options[index].endX - props.options[index].startX, 2) +
        Math.pow(props.options[index].endY - props.options[index].startY, 2)
    );
    props.options[index].lineStyle = {
      width: `${newWidth}px`,
      transform: `rotate(${rote}deg)`,
      transformOrigin: "0% 0%",
    };
  }
};

function calcularRotacao(xA, yA, xB, yB) {
  const deltaX = xB - xA;
  const deltaY = yB - yA;

  const anguloRad = Math.atan2(deltaY, deltaX);

  const anguloGraus = (anguloRad * 180) / Math.PI;

  return Math.round(anguloGraus);
}

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
  const isCorrect =
    newArray.every((element) => {
      const correct = props.correctAnswer.find(
        (item) => item.leftCardIndex === element.rightCardIndex
      );

      return element.rightCardIndex === correct.rightCardIndex;
    }) && newArray.length === props.correctAnswer.length;
  emits("update:isCorrect", isCorrect);
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
  height: 4 60px;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
}

.title {
  color: black;
  font-size: 18px;
}

.btn-purple {
  width: 20%;
  padding: 10px;
  background: #735096;
}
.btn-right {
  padding: 10px;
  height: 100%;
  background: #735096;
}
.btn-blue {
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
