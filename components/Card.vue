<template>
  <div :class="`card ${props.circle ? 'rounded-5' : ''}`" :style="cardStyles">
    <div class="card-body body" :style="cardPadding">
      <slot></slot>
    </div>
    <div v-if="props.hasButton" :style="props.isLeft ? Left : Button">
      <slot name="button"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  width: {
    type: Number,
    default: 200,
  },
  background: String,
  shadow: {
    type: Boolean,
    default: true,
  },
  circle: {
    type: Boolean,
    default: false,
  },
  paddingBottom: {
    type: Number,
    default: 16,
  },
  paddingTop: {
    type: Number,
    default: 16,
  },
  paddingLeft: {
    type: Number,
    default: 16,
  },
  paddingRight: {
    type: Number,
    default: 16,
  },
  hasButton: {
    type: Boolean,
    default: false,
  },
  isLeft: {
    type: Boolean,
    default: false,
  },
});

const cardStyles = {
  width: `${props.width}%`,
  background: props.background || "white",
  boxShadow: props.shadow ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
  border: "none",
};

const cardPadding = {
  paddingTop: `${props.paddingTop}px`,
  paddingBottom: `${props.paddingBottom}px`,
  paddingLeft: `${props.paddingLeft}px`,
  paddingRight: `${props.paddingRight}px`,
};

const Button = {
  position: `absolute`,
  top: `${30}%`,
  right: `${-10}px`,
};

const Left = {
  position: `absolute`,
  top: `${30}%`,
  left: `-${10}px`,
};
</script>

<style scoped>
.body {
  width: 100%;
  height: 100%;
}
</style>
