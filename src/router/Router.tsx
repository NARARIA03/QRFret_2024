import LandingPage from "@pages/LandingPage";
import RafflePage from "@pages/RafflePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Router(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/raffle" element={<RafflePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
