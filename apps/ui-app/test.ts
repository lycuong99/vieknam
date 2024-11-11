const OPENROUTER_API_KEY = `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`;
const YOUR_SITE_URL = "";
const MODELS = {
  openAI: `openai/chatgpt-4o-latest`,
  gemini: "google/gemini-flash-1.5-8b",
  meta: "meta-llama/llama-3.2-3b-instruct:free",
  perplexity: "perplexity/llama-3.1-sonar-huge-128k-online",
};
fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
    //   "HTTP-Referer": `${YOUR_SITE_URL}`, // Optional, for including your app on openrouter.ai rankings.
    //   "X-Title": `${YOUR_SITE_NAME}`, // Optional. Shows in rankings on openrouter.ai.
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: MODELS.perplexity,
    messages: [
      {
        role: "user",
        content: `tôi vừa tham giao vào 1 team thông qua internet, tôi muốn trả lời lại câu chào của anh ấy:
Chào Cường, rất vui được chào đón em đến với team nha. Hãy trả lời ngắn gọn trong 100 từ`,
      },
    ],
  }),
}).then(async (res) => {
  const data = await res.json();
  console.log(data);
});
