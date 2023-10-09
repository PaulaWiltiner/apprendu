<script lang="ts" setup></script>

<template>
  <footer class="footer fixed-footer py-3 bg-light">
    <div class="container display">
      <slot></slot>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.fixed-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 65px;

  z-index: 1000; /* Isso define a camada de empilhamento para garantir que o footer esteja sobreposto a outros elementos */
  /* Adicione estilos adicionais conforme necessário */
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.1); /* Isso adiciona uma sombra na parte superior do footer */
}

.display {
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
