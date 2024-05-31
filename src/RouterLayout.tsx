import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function RouterLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default RouterLayout;
