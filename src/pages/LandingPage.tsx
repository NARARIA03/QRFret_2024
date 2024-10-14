import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage(): null {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/raffle");
  }, [navigate]);

  return null;
}

export default LandingPage;
