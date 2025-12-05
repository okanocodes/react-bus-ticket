import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import SearchPage from "../pages/SearchPage";
import SeatSelectionPage from "../pages/SeatSelectionPage";
import SummaryPage from "../pages/SummaryPage";
import SuccessPage from "../pages/SuccessPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: SearchPage,
      },
      {
        path: "seats/:tripId",
        Component: SeatSelectionPage,
      },
      {
        path: "summary",
        Component: SummaryPage,
      },
      {
        path: "success",
        Component: SuccessPage,
      },
    ],
  },
]);

export default router;
