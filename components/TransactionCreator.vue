<script lang="ts" setup>
import { Transaction, TransactionType } from "@/types/transaction";

import TransactionButton from "./TransactionButton.vue";

const emit = defineEmits<{
  (event: "inserted", value: Transaction): void;
}>();

const transaction = ref<Transaction>({
  title: "New Transaction",
  currency: "BRL",
  value: 10000,
  id: 0,
});

const transactions = ref<Transaction[]>([]);

function onSelectType(_type: TransactionType) {
  transaction.value.type = _type;
}

function addTransaction() {
  transactions.value.push(transaction.value);

  localStorage.setItem("transactions", JSON.stringify(transactions.value));
}

// async function createTransaction() {
//   const data = await useTransaction().createTransaction({
//     title: "New Transaction",
//     currency: "BRL",
//     value: 10000,
//     type: TransactionType.RECEIVE,
//   });
//   emit("inserted", data);
// }

const types: TransactionType[] = [
  TransactionType.PAYMENT,
  TransactionType.RECEIVE,
  TransactionType.TRANSFERENCY,
];
</script>

<template>
  <div class="app-transaction-creator app-mt-5">
    <h2 class="app-transaction-creator__title">
      <img src="/img/money_icon.svg" alt="" /> Adicionar transação
    </h2>
    <div class="app-transaction-creator__buttons app-align-center app-mt-3">
      <TransactionButton
        v-for="buttonType in types"
        :key="buttonType"
        :type="buttonType"
        @select:type="onSelectType"
      />
      <form action="" method="" class="app-transaction-creator__form">
        <input
          class="app-input"
          placeholder="New Transition"
          v-model="transaction.title"
        />
        <input
          class="app-input"
          placeholder="BRL"
          v-model="transaction.currency"
        />
        <input
          class="app-input"
          type="text"
          placeholder="10000"
          v-model="transaction.value"
        />
        <button type="button" class="app-button">Adicionar</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.app-transaction-creator {
  width: 1024px;
  margin-left: auto;
  margin-right: auto;
}

.app-transaction-creator__buttons {
  display: flex;
  gap: 30px;
}

.app-transaction-creator__form {
  display: flex;
  gap: 10px;
}
</style>
