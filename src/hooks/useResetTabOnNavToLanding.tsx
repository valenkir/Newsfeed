import React from "react";
import { useLocation } from "react-router-dom";
import { QParamsContext } from "../context/QParams";

const useResetTabOnNavToLanding = () => {
  const location = useLocation();
  const context = React.useContext(QParamsContext)!;

  React.useEffect(() => {
    if (location.pathname === "/" && context) {
      context.changeTab(null);
    }
  }, [location, context]);
};

export default useResetTabOnNavToLanding;
