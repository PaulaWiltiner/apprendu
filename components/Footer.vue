<template>
  <footer class="footer fixed-footer py-3 bg-light">
    <div class="container" :class="justify ?? 'center'">
      <slot></slot>
    </div>
  </footer>
</template>

<script setup>
const props = defineProps({
  justify: {
    type: String,
    default: "center",
  },
});
</script>

<style lang="scss" scoped>
.fixed-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 65px;
  z-index: 1000;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.1);
}

.center {
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.left {
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.right {
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.space-between {
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
