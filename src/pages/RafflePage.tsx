import Footer from "@components/Footer";
import InputPhoneComp from "@components/InputPhoneComp";
import ViewRaffleComp from "@components/ViewRaffleComp";
import { useLogoClick } from "@hooks/useLogoClick";
import { getCookie } from "@utils/cookie";
import React, { useEffect, useState } from "react";

function RafflePage(): React.JSX.Element {
  // 로고를 5초 안에 10번 클릭하면
  // 비밀번호를 확인받고 DevPage로 이동시키는 함수를 반환하는 커스텀 훅
  const handleLogoClick = useLogoClick();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [cookieRafNum, setCookieRafNum] = useState<string | null>(null);
  const [cookiePhoneNum, setCookiePhoneNum] = useState<string | null>(null);

  useEffect(() => {
    const rafNumber = getCookie("rafNumber");
    const phoneNum = getCookie("phoneNumber");

    localStorage.removeItem("isDev");
    setCookieRafNum(rafNumber || null);
    setCookiePhoneNum(phoneNum || null);

    setIsLoading(false);
  }, []);

  return (
    <div className="bg-zinc-950 w-screen min-h-screen flex flex-col justify-between text-slate-200">
      <div className="w-full flex justify-center" onClick={handleLogoClick}>
        <img src="/images/header.png" className="object-cover w-full" />
      </div>
      {!isLoading &&
        (cookieRafNum && cookiePhoneNum ? (
          <ViewRaffleComp raffleNum={cookieRafNum} phoneNum={cookiePhoneNum} />
        ) : (
          <InputPhoneComp
            setCookieRafNum={setCookieRafNum}
            setCookiePhoneNum={setCookiePhoneNum}
          />
        ))}

      <Footer />
    </div>
  );
}

export default RafflePage;
