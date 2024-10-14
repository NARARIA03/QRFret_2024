import InputPhoneComp from "@components/InputPhoneComp";
import ViewRaffleComp from "@components/ViewRaffleComp";
import { getCookie } from "@utils/cookie";
import React, { useEffect, useState } from "react";

function RafflePage(): React.JSX.Element {
  const [cookieRafNum, setCookieRafNum] = useState<string | null>(null);
  const [cookiePhoneNum, setCookiePhoneNum] = useState<string | null>("");

  useEffect(() => {
    const rafNumber = getCookie("rafNumber");
    const phoneNum = getCookie("phoneNumber");
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
    <div className="bg-stone-900 w-screen h-screen">
      {cookieRafNum && cookiePhoneNum ? (
        <ViewRaffleComp raffleNum={cookieRafNum} phoneNum={cookiePhoneNum} />
      ) : (
        <InputPhoneComp />
      )}
    </div>
  );
}

export default RafflePage;
