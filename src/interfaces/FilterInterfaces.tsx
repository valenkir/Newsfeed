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
  from?: Date;
  to?: Date;
  q?: string;
}
