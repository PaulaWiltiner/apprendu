<script setup>
import { defineEmits } from "vue";

const props = defineProps({
  next: Boolean,
  confirm: Boolean,
  info: Boolean,
  back: Boolean,
  previous: Boolean,
});

const emits = defineEmits(["click"]);

const handleClick = () => {
  emits("click");
};
</script>

<template>
  <button
    v-if="confirm"
    type="button"
    class="btn btn-lg rounded-5 w-75 btn-orange"
    @click="handleClick"
  >
    <slot></slot>
  </button>
  <button
    v-if="next"
    type="button"
    class="btn btn-lg rounded-5 w-0 btn-orange"
    @click="handleClick"
  >
    <i class="bi bi-arrow-right icon-md"></i>
  </button>
  <button
    v-if="previous"
    type="button"
    class="btn btn-lg rounded-5 w-0 btn-orange"
    @click="handleClick"
  >
    <i class="bi bi-arrow-left icon-md"></i>
  </button>
  <button
    v-if="back"
    type="button"
    class="btn btn-lg rounded-5 w-60 btn-back"
    @click="handleClick"
  >
    <slot></slot>
  </button>

  <button v-if="info" type="button" class="btn btn-lg rounded-5 w-75 btn-blue">
    Info
  </button>
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
.icon-md {
  font-size: 20px; /* Ajuste o tamanho conforme necessário */
}
.btn-orange {
  background: linear-gradient(45deg, #f39c76, #e5b9a8);
  color: white;
  font-size: 16px;
}
.btn-purple {
  background: linear-gradient(45deg, #9266be, #bcb0e8);
}
.btn-blue {
  background: linear-gradient(45deg, #678ac9, #7ec4cf);
}
.btn-blue {
  background: linear-gradient(45deg, #ea5acb, #f7ace4);
}
.btn-back {
  background: none;
  color: #735096;
  border-color: #735096;
}
</style>
