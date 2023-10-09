<script lang="ts" setup></script>

<template>
  <header class="fixed-top bg-white shadow-sm app-header--height">
    <div
      class="container d-flex justify-content-between align-items-center py-2"
    >
      <div class="d-flex align-items-center">
        <img
          src="/img/icon-apprendu.svg"
          alt="Logo"
          class="mr-2"
          style="max-height: 40px"
        />
        <h1 class="m-0">Seu Logo</h1>
      </div>

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
</style>
