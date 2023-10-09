<template>
  <div class="progress progress--size btn-purple" role="progressbar">
    <div
      class="progress-bar progress-bar--transition btn-blue"
      :style="`width: ${progress}%`"
      :aria-valuenow="progress"
      aria-valuemin="0"
      aria-valuemax="100"
    ></div>
  </div>
</template>

<script setup>
const { progress } = defineProps(["progress"]);
</script>

<style lang="scss" scoped>
.progress--size {
  height: 8px;
  padding: 0px;
  margin-bottom: 20px;
}
.progress-bar--transition {
  border-radius: var(--bs-progress-border-radius);
}
.btn-purple {
  background: linear-gradient(45deg, #735096, #9388ba);
}
.btn-blue {
  background: #f39c76;
}
</style>
