<template>
  <div>
    <h2 class="title">{{ props.question }}</h2>

    <div class="row wid" v-for="(item, index) in props.items" :key="index">
      <Card
        :width="card.width"
        :background="card.background"
        :shadow="card.shadow"
        :padding-bottom="card.paddingBottom"
        :padding-top="card.paddingTop"
        :padding-left="card.paddingLeft"
        :padding-right="card.paddingRight"
        :has-button="card.hasButton"
      >
        <p class="card-text text">{{ item.text1 }}</p>
        <template #button>
          <button
            type="button"
            class="btn btn-purple rounded-5"
            @mousedown="(event) => startStretching(index, event)"
            @mouseup="stopStretching(index)"
            @mousemove="(event) => stretchLine(index, event)"
            @touchstart="(event) => startStretching(index, event)"
            @touchend="stopStretching(index)"
            @touchmove="(event) => stretchLine(index, event)"
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
        :padding-left="16"
        :padding-right="card.paddingRight"
        :has-button="card.hasButton"
        :is-left="true"
      >
        <p class="card-text text">{{ item.text2 }}</p>
        <template #button>
          <button
            type="button"
            class="btn btn-right rounded-5"
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
  correctMatch: Array, // Recebe a ordem correta dos itens
  items: Array,
  question: String,
  isCorrect: Boolean,
  background: String,
});

const card = ref({
  id: 1,
  width: 30,
  background:
    props.background ?? "linear-gradient(135deg, #ffafbd 0%, #ffc3a0 100%)",
  shadow: false,
  circle: false,
  paddingBottom: 10,
  paddingTop: 10,
  paddingLeft: 5,
  paddingRight: 5,
  hasButton: true,
});

const rightButton = ref();
const connectedPairs = ref([]);
const startStretching = (index, event) => {
  props.items[index].isStretching = true;
  connectedPairs.value.splice(
    0,
    connectedPairs.value.length,
    ...connectedPairs.value.filter((item) => item.leftCardIndex !== index)
  );
  if (!props.items[index].startX) {
    props.items[index].startX = getClientX(event);
    props.items[index].endX = getClientX(event);
    props.items[index].startY = getClientY(event);
    props.items[index].endY = getClientY(event);
  }
};

const stopStretching = (index) => {
  for (const [key, button] of rightButton.value.entries()) {
    const lineRect = button.getBoundingClientRect();

    const mouseX = props.items[index].endX;
    const mouseY = props.items[index].endY;
    if (
      mouseX >= lineRect.left &&
      mouseX <= lineRect.right &&
      mouseY >= lineRect.top &&
      mouseY <= lineRect.bottom
    ) {
      props.items[index].startX = mouseX;
      props.items[index].endX = mouseX;
      props.items[index].startY = mouseY;
      props.items[index].endY = mouseY;
      connectedPairs.value.push({
        leftCardIndex: index,
        rightCardIndex: key,
      });
      break;
    } else if (key === props.items.length - 1) {
      const newWidth = 0;
      props.items[index].lineStyle = {
        width: `${newWidth}px`,
        transform: `rotate(0deg)`,
        transformOrigin: "0% 0%",
      };
      props.items[index].isStretching = false;
      props.items[index].startX = null;
      props.items[index].endX = null;
      props.items[index].startY = null;
      props.items[index].endY = null;
    }
  }
};

const stretchLine = (index, event) => {
  if (props.items[index].isStretching) {
    props.items[index].endX = getClientX(event);
    props.items[index].endY = getClientY(event);
    const rote = calcularRotacao(
      props.items[index].startX,
      props.items[index].startY,
      props.items[index].endX,
      props.items[index].endY
    );
    const newWidth = Math.sqrt(
      Math.pow(props.items[index].endX - props.items[index].startX, 2) +
        Math.pow(props.items[index].endY - props.items[index].startY, 2)
    );
    props.items[index].lineStyle = {
      width: `${newWidth + 10}px`,
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

const emits = defineEmits(["update:isCorrect"]);
watch(connectedPairs.value, (newArray) => {
  const isCorrect = newArray.every(
    (element, index) =>
      element.leftCardIndex === props.correctMatch[index].leftCardIndex &&
      element.rightCardIndex === props.correctMatch[index].rightCardIndex
  );
  emits("update:isCorrect", isCorrect);
});
</script>

<style scoped>
.elastic-line-container {
  position: relative;
  width: 100%;
  height: 12px; /* Altura da linha em pixels */
  cursor: pointer; /* Altera o cursor para um indicador de clique */
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
}

.elastic-line {
  background: linear-gradient(45deg, #c3a5c2, #7ec4cf); /* Cor da linha */
  height: 12px;
  position: absolute;
  z-index: -1;
  top: 0;
}
</style>
