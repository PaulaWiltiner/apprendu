import { APISettings } from "../config.js";
import { Transaction } from "types/transaction.js";

// export async function getData() {
    
//     return fetch(APISettings.baseURL + '/transactions', {
//       method: "GET",
//       headers: APISettings.headers,
//     }).then(function (response) {
//       if (response.status != 200) {
//         throw response.status;
//       } else {
//         return response.json();
//       }
//     });
// }
  
// export async function createData(data: Transaction) {
//     APISettings.headers.set("Content-Type", "application/json");
//     return fetch(APISettings.baseURL + '/transactions', {
//       method: "POST",
//       headers: APISettings.headers,
//       body: JSON.stringify(data),
//     }).then(function (response) {
//       if (response.status != 201) {
//         throw response.status;
//       } else {
//         return response.json();
//       }
//     });
//   }

