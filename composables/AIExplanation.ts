import axios from "axios";

export function useAI() {
  const apiUrl =
    "https://api.openai.com/v1/engines/text-davinci-003/completions";
  const { KEY_API } = useRuntimeConfig().public;

  const apiKey = KEY_API;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  async function getAIExplanation(prompt: string) {
    try {
      const response = await axios.post(
        apiUrl,
        {
          prompt,
          max_tokens: 65,
        },
        { headers }
      );

      const explanation = response.data.choices[0].text;
      return explanation;
    } catch (error) {
      console.error("Erro ao consultar a API:", error.message);
    }
  }

  return {
    getAIExplanation,
  };
}
