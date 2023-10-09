<script lang="ts" setup>
import { TransactionType } from "@/types/transaction";

const props = defineProps<{
  type: TransactionType;
}>();

const emit = defineEmits<{
  (e: "select:type", type: TransactionType): void;
}>();

const values = computed(
  () =>
    ({
      [TransactionType.PAYMENT]: {
        message: "Pagamento",
        image: "/img/money_button.svg",
        color: "var(--app-color-primary-base)",
      },
      [TransactionType.RECEIVE]: {
        message: "Recebimento",
        image: "/img/revenue_button.svg",
        color: "var(--app-color-secondary-base)",
      },
      [TransactionType.TRANSFERENCY]: {
        message: "Transferência",
        image: "/img/transfer_button.svg",
        color: "var(--app-color-accent-base)",
      },
    }[props.type])
);

function onSelectType() {
  emit("select:type", props.type);
}
</script>

<template>
  <div
    role="button"
    tabindex="0"
    class="app-transaction-button app-justify-center app-align-center"
    @click="onSelectType"
    @keydown.enter="onSelectType"
  >
    <div
      :style="`--color: ${values.color}`"
      class="app-transaction-button__payment app-justify-center app-align-center"
    >
      <img :src="values.image" alt="" />
    </div>
    <span class="app-mt-1">{{ values.message }}</span>
  </div>
</template>

<style lang="scss" scoped>
.app-transaction-button {
  flex-direction: column;
  .app-transaction-button__payment {
    height: 100px;
    width: 100px;
    border-radius: 50px;
    background-color: var(--color);
  }
}
</style>
