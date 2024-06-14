import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Landing from "./pages/Landing";
import RouterLayout from "./RouterLayout";
import CssBaseline from "@mui/material/CssBaseline";
import { fetchData } from "./components/HeadlinesList";
import "./assets/css/App.scss";
import FeedLayout from "./FeedLayout";
import Feed from "./pages/Feed";
import { ThemeProvider } from "./context/Theme";
import "./assets/css/fonts.scss";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RouterLayout />}>
      <Route path="" element={<Landing />} loader={fetchData} />
      <Route path="feed" element={<FeedLayout />}>
        <Route path="" element={<Feed />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
}

export default App;
