<template>
  <div v-if="!hasEmail" class="container">
    <h2>Gostaríamos de ouvir sua opinião para melhorar o app Apprendu!</h2>

    <textarea
      v-model="resposta1"
      class="form-control"
      placeholder="O que você achou dos conteúdos teóricos?"
    ></textarea>
    <textarea
      v-model="resposta2"
      class="form-control"
      placeholder="O que mais gostou no app?"
    ></textarea>
    <textarea
      v-model="resposta3"
      class="form-control"
      placeholder="O que menos gostou no app? E do que sentiu falta?"
    ></textarea>

    <div class="input-group-append">
      <button @click="send" class="btn btn-primary" :disabled="loading">
        <div
          v-if="loading"
          class="spinner-border spinner-border-sm"
          role="status"
        ></div>
        <div v-else>Enviar</div>
      </button>
      <button @click="send" class="btn btn-danger" :disabled="loading">
        <div
          v-if="loading"
          class="spinner-border spinner-border-sm"
          role="status"
        ></div>
        <div v-else>Não quero</div>
      </button>
    </div>
  </div>
  <Email v-else />
</template>

<script setup>
import Button from "@/components/Button.vue";
import { useAPI } from "@/composables/API.ts";
import Email from "@/components/Email.vue";

const { sendForm } = useAPI();
const resposta1 = ref(null);
const resposta2 = ref(null);
const resposta3 = ref(null);
const loading = ref(false);
const hasEmail = ref(false);

async function send() {
  loading.value = true;
  await sendForm({
    conteudo: resposta1.value,
    app: resposta2.value,
    faltou: resposta3.value,
  });
  loading.value = false;
  hasEmail.value = true;
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  background: linear-gradient(45deg, #f39c76, #e5b9a8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 22px;
}

.bg-gradient {
  background: linear-gradient(45deg, #f39c76, #e5b9a8);
  padding: 20px 0;
  color: #fff;
}

.input-group {
  margin-top: 20px;
}

.input-group-append {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
}
</style>
