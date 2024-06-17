import React from "react";
import { useSearchParams } from "react-router-dom";
import { QParamsContextType } from "../interfaces/ContextInterfaces";

const QParamsContext = React.createContext<QParamsContextType | undefined>(
  undefined
);
function QParamsProvider({ children }: { children: React.ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = React.useState<string | null>(null);
  const changeTab = (newTab: string | null) => {
    setTab(newTab);
    newTab
      ? sessionStorage.setItem("categoryTab", newTab)
      : sessionStorage.removeItem("categoryTab");
  };
  const contextValue: QParamsContextType = {
    searchParams,
    setSearchParams,
    tab,
    changeTab,
  };
  return (
    <QParamsContext.Provider value={contextValue}>
      {children}
    </QParamsContext.Provider>
  );
}

export { QParamsContext, QParamsProvider };
