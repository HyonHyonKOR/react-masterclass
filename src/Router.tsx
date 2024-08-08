import { createBrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import About from "./screens/About";
import NotFound from "./screens/NotFound";
import Root from "./Root";
import ErrorComponents from "./components/ErrorComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <ErrorComponents />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
