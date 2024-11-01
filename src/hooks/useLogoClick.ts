import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogoClick = () => {
  const [clickCnt, setClickCnt] = useState<number>(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (clickCnt === 0) {
      const newTimer = setTimeout(() => {
        setClickCnt(0);
      }, 5000);
      setTimer(newTimer);
    }
    if (clickCnt + 1 >= 10 && timer) {
      clearTimeout(timer);
      const password = window.prompt("비밀번호를 입력하세요");
      if (password === import.meta.env.VITE_DEV_PASSWORD) {
        localStorage.setItem("isDev", "true");
        navigate("/dev");
      } else {
        alert("비밀번호가 틀렸습니다");
      }
      setClickCnt(0);
    } else {
      setClickCnt((prev) => prev + 1);
    }
  };

  return handleLogoClick;
};
