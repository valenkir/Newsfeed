import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import Landing from "./pages/Landing";
import RouterLayout from "./RouterLayout";
import { fetchData } from "./components/HeadlinesList";
import "./assets/css/App.scss";
import FeedLayout from "./FeedLayout";
import Feed from "./pages/Feed";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RouterLayout />}>
      <Route path="" element={<Landing />} loader={fetchData} />
      <Route path="feed" element={<FeedLayout />}>
        <Route path="" element={<Navigate to="All" replace />} />
        <Route path=":filter" element={<Feed />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
