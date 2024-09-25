import LandingPage from "@pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Router(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
