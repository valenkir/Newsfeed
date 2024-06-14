import { Outlet, useLocation, Navigate } from "react-router-dom";
import { QParamsProvider } from "./context/QParams";

function FeedLayout() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  if (!searchParams.get("page") || !searchParams.get("category")) {
    return <Navigate to="/feed?page=1&category=general" replace />;
  }
  return (
    <QParamsProvider>
      <div>
        <main>
          <Outlet></Outlet>
        </main>
      </div>
    </QParamsProvider>
  );
}

export default FeedLayout;
