import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ContinousQr from "../pages/ContinousQr";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />
    },
    {
        path: "/destino",
        element: <ContinousQr/>
    }
  ]);