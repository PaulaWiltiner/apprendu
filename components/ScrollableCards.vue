<template>
  <div class="scrollable-cards">
    <div class="container">
      <div class="row container--height">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollable-cards {
  padding: 20px 0;
  overflow: hidden;
  margin-top: 60px;
  margin-bottom: 90px;
  margin-left: 10px;
  margin-right: 10px;
}

.container--height {
  gap: 20px;
}
</style>
