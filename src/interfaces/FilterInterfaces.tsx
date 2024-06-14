export type CategoryFilter =
  | "none"
  | ""
  | "All"
  | "General"
  | "Business"
  | "Tech"
  | "Science"
  | "Health"
  | "Sports"
  | "Entertainment";

export interface OtherFilters {
  country?: string;
  q?: string;
  countryName?: string;
  page?: number;
  category?: string;
}
