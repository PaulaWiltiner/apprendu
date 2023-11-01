<template>
  <Transition name="slide-up" :duration="4000">
    <div v-if="active" :class="alertClass">
      <div class="custom-alert" :class="alertClass">
        <strong :class="isSuccess ? 'title' : 'errorTitle'">{{ title }}</strong>
        <p class="text">{{ text }}</p>
        <hr />
        <div :class="isSuccess ? 'right' : 'space-between'">
          <button v-if="!isSuccess" class="btn btn-danger" @click="retry">
            <i class="bi bi-arrow-repeat"></i>
          </button>
          <button
            :class="isSuccess ? 'btn btn-success' : 'btn btn-danger'"
            @click="advance"
          >
            <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: String,
  text: String,
  info: Boolean,
  back: Boolean,
  previous: Boolean,
  isSuccess: {
    type: Boolean,
    default: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

const alertClass = computed(() =>
  props.isSuccess
    ? "alert alert-success custom-alert"
    : "alert alert-danger custom-alert"
);

const emits = defineEmits(["update:active", "advance", "retry"]);

const close = () => {
  emits("update:active", false);
};

const advance = () => {
  emits("advance");
  close();
};

const retry = () => {
  emits("retry");
  close();
};
</script>

<style lang="scss" scoped>
.padding-divider {
  padding: 6px;
  color: black;
}
.title {
  color: #17a84a;
  font-size: 14px;
}

.errorTitle {
  color: rgb(168, 23, 42);
  font-size: 14px;
}

.text {
  color: black;
  font-size: 12px;
}
.custom-alert {
  width: 100%;
  height: auto;
  margin: 0px;
  position: fixed;
  border-radius: 0px;
  bottom: 0;
  left: 0;
  z-index: 1200;
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
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

.slide-up-enter-active,
.slide-up-leave-active {
  transform: translateX(0);
  opacity: 1;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateX(120%);
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transform: translateY(0);
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-120%);
}
</style>
