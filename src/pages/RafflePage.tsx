import InputPhoneComp from "@components/InputPhoneComp";
import { getCookie } from "@utils/cookie";
import React, { useEffect, useState } from "react";

function RafflePage(): React.JSX.Element {
  const [cookieRafNum, setCookieRafNum] = useState<string | null>(null);

  useEffect(() => {
    const rafNumber = getCookie("rafNumber");
    if (rafNumber) {
      setCookieRafNum(rafNumber);
    } else {
      setCookieRafNum(null);
    }
    console.log(rafNumber);
  }, []);

  return (
    <div className="bg-stone-900 w-screen h-screen">
      {cookieRafNum ? (
        <div>
          <p>{cookieRafNum}</p>
        </div>
      ) : (
        <InputPhoneComp />
      )}
    </div>
  );
}

export default RafflePage;
