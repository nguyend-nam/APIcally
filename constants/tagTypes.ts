export type apiTagTypes =
  | "ai"
  | "bank"
  | "cooking"
  | "e-commerce"
  | "economics"
  | "environment"
  | "entertainment"
  | "healthcare"
  | "social-network"
  | "sport"
  | "technology"
  | "weather"
  | "other";

export const apiTags: Record<apiTagTypes, string> = {
  ai: "AI",
  bank: "Banking",
  cooking: "Cooking",
  "e-commerce": "E-commerce",
  economics: "Economics",
  entertainment: "Entertainment",
  environment: "Environment",
  healthcare: "Healthcare",
  "social-network": "Social network",
  sport: "Sport",
  technology: "Technology",
  weather: "Weather",
  other: "Other",
};
