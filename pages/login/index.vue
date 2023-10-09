<script lang="ts" setup></script>

<template>
  <main class="app-main app-justify-between app-align-center">
    <img
      class="app-floating-image app-floating-image--top"
      src="/img/money.png"
      alt=""
    />
    <img
      class="app-floating-image app-floating-image--middle"
      src="/img/girl.png"
      alt=""
    />
    <img
      class="app-floating-image app-floating-image--bottom"
      src="/img/money.png"
      alt=""
    />

    <section class="app-main__column--left app-align-center app-pl-8">
      <div class="app-main__column__content">
        <img class="app-py-1 app-logo" src="/img/logo.svg" alt="Wallet logo" />
        <span class="app-py-1">
          A resposta para
          <br />
          sua gestão financeira.
        </span>
        <div class="app-py-4">
          <img src="/img/ig.svg" class="app-mr-1" alt="instagram" />
          <img src="/img/in.svg" class="app-mr-1" alt="linkedin" />
          <img src="/img/yt.svg" alt="youtube" />
        </div>
      </div>
    </section>

    <section
      class="app-main__column--right app-align-center app-justify-center"
    >
      <div class="app-main__input app-align-center app-justify-center app-px-4">
        <h2 class="app-main__input--title app-mb-4">Faça seu login</h2>
        <input type="text" class="app-input" placeholder="Digite seu e-mail" />
        <input
          type="text"
          class="app-input app-mt-1"
          placeholder="Digite sua senha"
        />
        <button class="app-mt-3 app-button">Entrar</button>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.app-main {
  overflow: hidden;
  background-color: #282236;
  height: 100vh;
  width: 100vw;
  position: fixed;
  .app-main__column--left {
    display: flex;

    width: 50%;
    height: 100vh;

    background-color: #8350f2;
    border-radius: 0px 50px 50px 0px;
    box-shadow: 8px 0px 8px -4px rgba(131, 80, 242, 0.24);

    .app-main__column__content {
      display: flex;
      flex-direction: column;
      .app-logo {
        width: 400px;
      }
    }
  }

  .app-main__column--right {
    display: flex;
    flex-direction: column;

    width: 50%;
    height: 100vh;

    .app-main__input {
      display: flex;
      flex-direction: column;
      background-color: #453c5a;
      width: 420px;
      height: 317px;
      border-radius: 6px;
      .app-main__input--title {
      }
    }
  }
}
</style>
