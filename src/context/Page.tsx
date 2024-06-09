import React from "react";
import { PageContextType } from "../interfaces/ContextInterfaces";

const PageContext = React.createContext<PageContextType>({
  page: 1,
  changePage: () => {},
});

function PageProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = React.useState<number>(1);
  const changePage = (pageNumber: number): void => {
    setPage(pageNumber);
  };
  return (
    <PageContext.Provider value={{ page, changePage }}>
      {children}
    </PageContext.Provider>
  );
}

export { PageContext, PageProvider };
