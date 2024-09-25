import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import React, { useEffect } from "react";

function LandingPage(): React.JSX.Element {
  // FireStore 테스트
  useEffect(() => {
    const func = async () => {
      const querySnapshot = await getDocs(collection(db, "test"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} -> ${JSON.stringify(doc.data().result)}`);
      });
    };
    func();
  }, []);

  return <p>hello landing</p>;
}

export default LandingPage;
