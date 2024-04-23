<template>
  <Header />
  <div v-if="!hasEmail" class="container">
    <h2>Gostaríamos de ouvir sua opinião para melhorar o app Apprendu!</h2>

    <textarea
      v-model="resposta1"
      class="form-control form-control--height"
      placeholder="Como foi a experiência de estudar matemática por um aplicativo?"
    ></textarea>
    <textarea
      v-model="resposta2"
      class="form-control form-control--height"
      placeholder="O que achou do conteúdo teórico? E o que achou das lições?"
    ></textarea>
    <textarea
      v-model="resposta3"
      class="form-control form-control--height"
      placeholder="O que você gostaria de ver em um aplicativo educação como este?"
    ></textarea>
    <textarea
      v-model="resposta4"
      class="form-control form-control--height"
      placeholder="Pensando na sua jornada de aprendizado, em que momento um aplicativo como esse poderia te ajudar?"
    ></textarea>

    <div class="input-group-append">
      <Button @click="send" :disabled="loading" :loading="loading" confirm>
        Enviar
      </Button>
      <Button @click="send" :disabled="loading" :loading="loading" confirm>
        Não quero
      </Button>
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
const resposta4 = ref(null);

const loading = ref(false);
const hasEmail = ref(false);

async function send() {
  loading.value = true;
  await sendForm({
    experiencia: resposta1.value,
    conteudo_licoes: resposta2.value,
    gostaria_de_ver: resposta3.value,
    momento_da_jornada: resposta4.value,
  });
  loading.value = false;
  hasEmail.value = true;
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  background: linear-gradient(45deg, #f39c76, #e5b9a8);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 22px;
  margin-top: 50px;
}

.form-control--height {
  height: 80px;
  font-size: 14px;
}

.bg-gradient {
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
