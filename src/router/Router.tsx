import LandingPage from "@pages/LandingPage";
import RafflePage from "@pages/RafflePage";
import DevPage from "@pages/DevPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Router(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/raffle" element={<RafflePage />} />
        <Route path="/dev" element={<DevPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
