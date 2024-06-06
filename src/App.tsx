import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Landing from "./pages/Landing";
import RouterLayout from "./RouterLayout";
import { fetchData } from "./components/HeadlinesList";
import "./assets/css/utilities.scss";
import "./assets/css/App.scss";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RouterLayout />}>
      <Route path="" element={<Landing />} loader={fetchData} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
