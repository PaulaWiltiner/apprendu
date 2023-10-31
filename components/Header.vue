<script lang="ts" setup>
const router = useRouter();
const handleClick = () => {
  router.push("/home");
};
</script>

<template>
  <header class="fixed-top bg-white shadow-sm app-header--height">
    <div
      class="container d-flex justify-content-between align-items-center py-2"
    >
      <div class="d-flex align-items-center" @click="handleClick()">
        <img
          src="/img/icon-apprendu.svg"
          alt="Logo"
          class="mr-2"
          style="max-height: 40px"
        />
      </div>

      <h3 class="app-header__container__h3 text-center">
        <slot></slot>
      </h3>

      <i class="bi bi-question-circle icon-purple h4 mb-0 font-weight-bold"></i>
    </div>
  </header>
</template>

<style lang="scss">
.icon-purple {
  color: #735096;
}
.app-header--height {
  height: 60px;
}

.app-header__container__h3 {
  color: #000;
  text-align: center;
  margin-bottom: 0px;
}
</style>
