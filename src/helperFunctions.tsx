import { OtherFilters } from "./interfaces/FilterInterfaces";

export const template: OtherFilters = {
  country: "",
  countryName: "",
  q: "",
  page: 0,
  category: null,
};

export const copyCurrentSearchParams = (searchParams: URLSearchParams) => {
  const currentFilters: OtherFilters = {};
  Object.keys(template).forEach((key: string) => {
    const paramValue = searchParams.get(key);
    if (paramValue !== null) {
      const objKey = key as keyof OtherFilters;
      currentFilters[objKey] = paramValue as any;
    }
  });

  return currentFilters;
};
