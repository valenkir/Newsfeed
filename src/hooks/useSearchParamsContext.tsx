import React from "react";
import { QParamsContext } from "../context/QParams";

const useSearchParamsContext = () => {
  const context = React.useContext(QParamsContext);
  if (!context) {
    throw new Error(
      "useSearchParamsContext must be used within a SearchParamsProvider"
    );
  }
  return context;
};

export default useSearchParamsContext;
