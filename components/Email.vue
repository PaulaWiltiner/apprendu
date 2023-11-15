<template>
  <div class="container">
    <h2>
      Gostaria de receber atualizações sobre a próxima versão do app Apprendu?
    </h2>

    <input
      v-model="email"
      type="email"
      class="form-control"
      placeholder="Digite seu e-mail"
    />
    <div class="input-group-append">
      <button
        @click="sendEmails"
        class="btn btn-primary"
        :disabled="loading || !email"
      >
        <div
          v-if="loading"
          class="spinner-border spinner-border-sm"
          role="status"
        ></div>
        <div v-else>Enviar</div>
      </button>
      <button @click="sendEmails" class="btn btn-danger" :disabled="loading">
        <div
          v-if="loading"
          class="spinner-border spinner-border-sm"
          role="status"
        ></div>
        <div v-else>Não quero</div>
      </button>
    </div>
  </div>
</template>
<script setup>
import Button from "@/components/Button.vue";
import { useAPI } from "@/composables/API.ts";

const { sendEmail } = useAPI();
const email = ref(null);
const router = useRouter();
const loading = ref(false);

async function sendEmails() {
  loading.value = true;
  await sendEmail({ email: email.value });
  loading.value = false;
  router.push("/home");
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
