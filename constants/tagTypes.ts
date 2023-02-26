export type apiTagTypes =
  | "ai"
  | "weather"
  | "environment"
  | "sport"
  | "bank"
  | "economics"
  | "e-commerce"
  | "healthcare"
  | "entertainment"
  | "cooking"
  | "social-network";

export const apiTags: Record<apiTagTypes, string> = {
  ai: "AI",
  bank: "Bank",
  cooking: "Cooking",
  "e-commerce": "E-commerce",
  economics: "Economics",
  entertainment: "Entertainment",
  environment: "Environment",
  healthcare: "Healthcare",
  "social-network": "Social network",
  sport: "Sport",
  weather: "Weather",
};
