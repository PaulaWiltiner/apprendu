<template>
  <div class="content-with-image">
    <div v-if="title" class="title" :style="titleStyles">{{ title }}</div>

    <div class="text-top" :style="textTopStyles">{{ textTop }}</div>

    <div v-if="imageUrl" class="image">
      <img :src="imageUrl" class="content-image" alt="Imagem" />
    </div>

    <div v-if="textBottom" class="text-bottom" :style="textBottomStyles">
      {{ textBottom }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  titleColor: {
    type: String,
    default: "black",
  },
  titleFontSize: Number,
  textTop: String,
  textBottom: String,
  imageUrl: String,
  textColorTop: {
    type: String,
    default: "black",
  },
  textColorBottom: {
    type: String,
    default: "black",
  },
  fontSizeTop: Number,
  fontSizeBottom: Number,
  isBoldTop: Boolean,
  isBoldBottom: Boolean,
});

const img = computed(() => props.imageUrl);

const textTopStyles = computed(() => {
  return {
    color: props.textColorTop,
    fontSize: `${props.fontSizeTop}px`,
    fontWeight: props.isBoldTop ? "bold" : "normal",
    textAlign: "left",
  };
});

const textBottomStyles = computed(() => {
  return {
    color: props.textColorBottom,
    fontSize: `${props.fontSizeBottom}px`,
    fontWeight: props.isBoldBottom ? "bold" : "normal",
    textAlign: "left",
  };
});

const titleStyles = {
  color: props.titleColor,
  fontSize: `${props.titleFontSize}px`,
  textAlign: "left",
};
</script>

<style scoped>
.content-with-image {
  text-align: center;
}

.content-image {
  width: 200px;
  height: 200px;
}

.text-top {
  font-size: 24px;
  margin-bottom: 20px;
}

.image {
  margin: 20px 0;
  max-width: "100%";
}

.text-bottom {
  font-size: 18px;
}
</style>
