import axios from "axios";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

/**
 * Generates a full trip itinerary using OpenAI's chat completion API.
 * Swap this out for the Gemini API by changing the endpoint/body shape below
 * if you prefer Gemini over OpenAI.
 */
export const generateItinerary = async ({ destination, duration, budget, travelers, travelStyle, transport }) => {
  const prompt = `Create a detailed ${duration}-day travel itinerary for ${destination}.
Travelers: ${travelers}. Budget: ${budget}. Travel style: ${travelStyle}. Transport: ${transport}.
Include for each day: morning/afternoon/evening activities, suggested hotels, restaurants, estimated daily expense, and one packing tip.
Return the result strictly as JSON with this shape:
{
  "summary": "string",
  "estimatedTotalCost": number,
  "days": [
    { "day": 1, "title": "string", "activities": ["string"], "hotel": "string", "restaurants": ["string"], "estimatedCost": number }
  ],
  "packingChecklist": ["string"],
  "emergencyNumbers": ["string"]
}
Respond with only the JSON, no markdown formatting.`;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const raw = response.data.choices[0].message.content;
  const cleaned = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
};

export const getAIBudgetSuggestion = async ({ destination, duration, travelers, currentBudget }) => {
  const prompt = `Given a ${duration}-day trip to ${destination} for ${travelers} travelers with a budget of ${currentBudget},
suggest a realistic budget breakdown across: accommodation, food, transport, activities, and miscellaneous.
Return strictly as JSON: { "accommodation": number, "food": number, "transport": number, "activities": number, "misc": number, "advice": "string" }`;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const raw = response.data.choices[0].message.content;
  const cleaned = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
};
