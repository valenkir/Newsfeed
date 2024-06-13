import { Outlet } from "react-router-dom";
import { QParamsProvider } from "./context/QParams";

function FeedLayout() {
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
