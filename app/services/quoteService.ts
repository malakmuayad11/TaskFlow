const API_KEY = import.meta.env.VITE_QUOTES_API_KEY;
const url = new URL("https://api.api-ninjas.com/v2/quoteoftheday");

export type QuoteResponse = {
  quote: string;
  author: string;
  work: string;
  categories: string[];
};

export async function getQuote(): Promise<QuoteResponse> {
  const response = await fetch(url, {
    headers: {
      "X-Api-Key": API_KEY,
    },
  });

  if (!response.ok) throw new Error("HTTP " + response.status);

  const data = (await response.json()) as QuoteResponse[];
  return data[0];
}
