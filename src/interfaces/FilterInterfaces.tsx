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

export interface IOtherFilters {
  country?: string;
  from?: string;
  to?: string;
  q?: string;
}
