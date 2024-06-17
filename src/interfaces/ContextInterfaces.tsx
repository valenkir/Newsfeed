export interface QParamsContextType {
  searchParams: URLSearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
  tab: string | null;
  changeTab: (newTab: string | null) => void;
}
