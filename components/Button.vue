<script setup>
import { defineEmits } from "vue";

const emits = defineEmits(["click"]);

const handleClick = () => {
  emits("click"); // Use emits como uma função
};
</script>

<template>
  <button
    type="button"
    class="btn btn-lg rounded-5 w-75 btn-orange"
    @click="handleClick"
  >
    Info
    <i class="bi bi-1-circle-fill"></i>
  </button>
  <!-- <button type="button" class="btn btn-lg rounded-5 w-0 btn-purple">
    <i class="bi bi-1-circle-fill"></i>
  </button>
  <button type="button" class="btn btn-lg rounded-5 w-75 btn-blue">Info</button> -->
  <!-- <button type="button" class="btn btn-lg rounded-5 w-75 btn-other">
    Info
    <i class="bi bi-1-circle-fill"></i>
  </button>
  <button type="button" class="btn btn-lg rounded-5 w-75 btn-other">
    Info
    <i class="bi bi-1-circle-fill"></i>
  </button> -->
</template>

<style lang="scss" scoped>
.btn-orange {
  background: linear-gradient(45deg, #f39c76, #e5b9a8);
}
.btn-purple {
  background: linear-gradient(45deg, #735096, #9388ba);
}
.btn-blue {
  background: linear-gradient(45deg, #3f5982, #7ec4cf);
}
.btn-other {
  background: linear-gradient(45deg, #c3a5c2, #7ec4cf);
}
</style>
