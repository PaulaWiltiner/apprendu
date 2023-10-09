<script lang="ts" setup>
import { Transaction } from "@/types/transaction";
import Card from "./Card.vue";

const props = defineProps<{
  transactions: Transaction[];
}>();
</script>

<template>
  <div class="app-transaction-list app-justify-center">
    <div class="app-justify-row">
      <img src="/img/layer_icon.svg" alt="icon transaction" />
      <h1 class="app-ml-1">Últimas transações</h1>
    </div>
    <h3 class="app-mt-3 app-mb-3">Hoje</h3>
    <div class="app-transaction-list__cards app-align-center">
      <Card
        v-for="transaction in props.transactions"
        :key="transaction.id"
        :transaction="transaction"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-transaction-list {
  width: 1024px;
  margin: 0 auto;
  margin-top: 60px;

  .app-transaction-list__cards {
    flex-wrap: wrap;
    gap: 40px;
  }
}
</style>
