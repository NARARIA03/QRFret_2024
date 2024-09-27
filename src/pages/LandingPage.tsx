import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage(): React.JSX.Element {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/raffle");
  }, []);

  return <></>;
}

export default LandingPage;
