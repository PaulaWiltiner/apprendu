export function useAPI() {
  const sheetRange = "Página1!A1:D200"; // Specify your desired sheet and range

  const getVars = () => {
    const SPREAD_SHEET_ID = useRuntimeConfig().public.SPREAD_SHEET_ID;
    const GOOGLE_API_KEY = useRuntimeConfig().public.GOOGLE_API_KEY;

    return { SPREAD_SHEET_ID, GOOGLE_API_KEY };
  };

  async function allRows() {
    const { SPREAD_SHEET_ID, GOOGLE_API_KEY } = getVars();
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREAD_SHEET_ID}/values/${sheetRange}?key=${GOOGLE_API_KEY}`;
    return await useFetch(url);
  }

  async function singleRow(row) {
    const { SPREAD_SHEET_ID, GOOGLE_API_KEY } = getVars();

    const rowRange = `Sheet1!A${row}:D${row}`;

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREAD_SHEET_ID}/values/${rowRange}?key=${GOOGLE_API_KEY}`;
    return await useFetch(url);
  }

  async function addRow(newData) {
    const { SPREAD_SHEET_ID, GOOGLE_API_KEY } = getVars();

    // Crie um JWT client usando as credenciais

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREAD_SHEET_ID}/values/${sheetRange}:append?key=${GOOGLE_API_KEY}`;

    const requestBody = {
      values: [newData], // Replace 'newData' with the data you want to add as an array
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };

    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(
          `Failed to add row: ${response.status} - ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error("Error adding row:", error);
      throw error;
    }
  }

  return {
    allRows,
    addRow,
  };
}
