<template>
  <svg class="line">
    <line
      :x1="startX"
      :y1="startY"
      :x2="endX"
      :y2="endY"
      stroke="black"
      stroke-width="2"
    />
  </svg>
</template>

<script>
export default {
  props: {
    startX: Number,
    startY: Number,
    endX: Number,
    endY: Number,
  },
};
</script>

<style scoped>
.line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
