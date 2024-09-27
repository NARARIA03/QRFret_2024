import InputPhoneComp from "@components/InputPhoneComp";
import { getCookie } from "@utils/cookie";
import React, { useEffect, useState } from "react";

function RafflePage(): React.JSX.Element {
  const [cookiedRafNum, setCookiedRafNum] = useState<string | null>(null);

  useEffect(() => {
    const rafNumber = getCookie("rafNumber");
    if (rafNumber) {
      setCookiedRafNum(rafNumber);
    } else {
      setCookiedRafNum(null);
    }
    console.log(rafNumber);
  }, []);

  return (
    <div>
      {cookiedRafNum ? (
        <div>
          <p>{cookiedRafNum}</p>
        </div>
      ) : (
        <InputPhoneComp />
      )}
    </div>
  );
}

export default RafflePage;
