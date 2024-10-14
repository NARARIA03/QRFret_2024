import InputPhoneComp from "@components/InputPhoneComp";
import ViewRaffleComp from "@components/ViewRaffleComp";
import { getCookie } from "@utils/cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RafflePage(): React.JSX.Element {
  const navigate = useNavigate();
  const [cookieRafNum, setCookieRafNum] = useState<string | null>(null);
  const [cookiePhoneNum, setCookiePhoneNum] = useState<string | null>("");
  const [clickCnt, setClickCnt] = useState<number>(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    const rafNumber = getCookie("rafNumber");
    const phoneNum = getCookie("phoneNumber");
    localStorage.removeItem("isDev");
    if (rafNumber) {
      setCookieRafNum(rafNumber);
    } else {
      setCookieRafNum(null);
    }
    if (phoneNum) {
      setCookiePhoneNum(phoneNum);
    } else {
      setCookiePhoneNum(null);
    }
  }, []);

  return (
    <div className="bg-black w-screen min-h-screen">
      <div className="w-full flex justify-center" onClick={handleLogoClick}>
        <img src="/images/poster.jpeg" />
      </div>
      {cookieRafNum && cookiePhoneNum ? (
        <ViewRaffleComp raffleNum={cookieRafNum} phoneNum={cookiePhoneNum} />
      ) : (
        <InputPhoneComp />
      )}
    </div>
  );
}

export default RafflePage;
