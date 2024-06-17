import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { QParamsProvider } from "./context/QParams";
import Footer from "./components/Footer";
import useResetTabOnNavToLanding from "./hooks/useResetTabOnNavToLanding";

function RouterLayout() {
  useResetTabOnNavToLanding();
  return (
    <QParamsProvider>
      <div>
        <header>
          <Header />
        </header>
        <main>
          <Outlet></Outlet>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </QParamsProvider>
  );
}

export default RouterLayout;
