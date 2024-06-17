import React from "react";
import { useLocation } from "react-router-dom";

const useResetTabOnNavToLanding = () => {
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === "/") {
      sessionStorage.removeItem("categoryTab");
    }
  }, [location]);
};

export default useResetTabOnNavToLanding;
