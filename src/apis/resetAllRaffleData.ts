import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const resetAllRaffleData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.docs.forEach(async (document) => {
      await deleteDoc(doc(collection(db, "users"), document.id));
    });

    await setDoc(doc(db, "users", "rafNumber"), {
      rafNumber: 0,
    });

    alert("기존 추첨번호 발급 데이터와 rafNumber가 초기화 되었습니다");
  } catch (e) {
    console.log("resetAllRaffleData 함수에서 에러 발생");
    console.error(e);
  }
};
