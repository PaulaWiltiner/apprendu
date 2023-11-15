<template>
  <Button @click="handleAnswe" confirm> Confirmar </Button>
</template>

<script setup>
import Button from "@/components/Button.vue";
// import { useAPI } from "@/composables/APISheets.ts";

const { allRows, addRow } = useAPI();

async function handleAnswe() {
  await addRow("ola");
}
</script>
