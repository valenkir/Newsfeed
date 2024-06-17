import React from "react";
import { useLocation } from "react-router-dom";

const useResetTabOnNavToLanding = () => {
  const location = useLocation();

  React.useEffect(() => {
    sessionStorage.removeItem("categoryTab");
  }, [location]);
};

export default useResetTabOnNavToLanding;
