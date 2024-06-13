import React from "react";
import { useSearchParams } from "react-router-dom";
import { QParamsContextType } from "../interfaces/ContextInterfaces";

const QParamsContext = React.createContext<QParamsContextType | undefined>(
  undefined
);

function QParamsProvider({ children }: { children: React.ReactNode }) {
  let [searchParams, setSearchParams] = useSearchParams();
  const contextValue: QParamsContextType = {
    searchParams,
    setSearchParams,
  };
  return (
    <QParamsContext.Provider value={contextValue}>
      {children}
    </QParamsContext.Provider>
  );
}

export { QParamsContext, QParamsProvider };
