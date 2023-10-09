import * as transactionsApi from "@/services/resources/transactions";
import { Transaction } from "@/types/transaction";

export function useTransaction() {
  async function listTransactions() : Promise<Transaction[]> {
    const transactions  = await transactionsApi.getData();
     return transactions;
  }

  async function createTransaction(transaction: Transaction) : Promise<Transaction> {
    const transactions  = await transactionsApi.createData(transaction);
     return transactions;
  }


  return {
    listTransactions,
    createTransaction
  }

}


