export interface QParamsContextType {
  searchParams: URLSearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
  tab: string | null;
  setTab: React.Dispatch<React.SetStateAction<string | null>>;
}
