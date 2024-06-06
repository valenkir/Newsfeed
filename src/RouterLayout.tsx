import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function RouterLayout() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default RouterLayout;
