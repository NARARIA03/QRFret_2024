import LandingPage from "@pages/LandingPage";
import RafflePage from "@pages/RafflePage";
import SetListPage from "@pages/SetListPage";
import DevPage from "@pages/DevPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function Router(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/raffle" element={<RafflePage />} />
        <Route path="/setlist" element={<SetListPage />} />
        <Route path="/dev" element={<DevPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
