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
  from?: string;
  to?: string;
  q?: string;
  countryName?: string;
  page?: number;
}
