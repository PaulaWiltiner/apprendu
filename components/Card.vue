<template>
  <div
    :class="`card ${props.circle ? 'rounded-5' : ''}`"
    :style="[cardStyles, cardPadding]"
    @click="clickable ? handleClick() : null"
  >
    <div class="card-body body" :style="center ? centerStyle : ''">
      <slot></slot>
    </div>
    <div v-if="props.hasButton" :style="isLeft ? Left : Button">
      <slot name="button"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const handleClick = () => {
  if (props.clickable) {
    if (props.to) {
      router.push(props.to);
    }
  }
};

const props = defineProps({
  clickable: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
  background: String,
  color: {
    type: String,
    default: "black",
  },
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
    default: 10,
  },
  paddingTop: {
    type: Number,
    default: 10,
  },
  paddingLeft: {
    type: Number,
    default: 10,
  },
  paddingRight: {
    type: Number,
    default: 10,
  },
  hasButton: {
    type: Boolean,
    default: false,
  },
  isLeft: {
    type: Boolean,
    default: false,
  },
  center: {
    type: Boolean,
    default: false,
  },
});

const cardStyles = {
  width: props.width,
  height: props.height,
  background: props.background || "white",
  color: props.color || "black",
  boxShadow: props.shadow ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
  border: "none",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const centerStyle = {
  alignItems: "center",
  justifyContent: "center",
};

const cardPadding = {
  paddingTop: `${props.paddingTop}px`,
  paddingBottom: `${props.paddingBottom}px`,
  paddingLeft: `${props.paddingLeft}px`,
  paddingRight: `${props.paddingRight}px`,
};

const Button = ref({
  position: `absolute`,
  top: `${50}%`,
  right: `${-10}px`,
  transform: "translateY(-50%)",
});

const Left = ref({
  position: `absolute`,
  top: "50%",
  transform: "translateY(-50%)",
  left: `${-10}px`,
  zIndex: 1,
});
</script>

<style scoped>
.body {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px;
}
</style>
