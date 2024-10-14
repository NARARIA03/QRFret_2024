import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { raffleTransaction } from "@apis/raffleTransaction";

/**
 * @description 이미 추첨번호가 있다면 해당 추첨번호를 반환하고, 추첨번호가 없다면 transaction으로 새로 구해서 저장하고 반환한다
 * @param phone 사용자가 입력한 전화번호 문자열
 * @returns 추첨번호 반환
 */
export const saveRaffleNumber = async (phone: string) => {
  try {
    const raffleSnapshot = await getDoc(doc(db, "users", phone));
    if (raffleSnapshot.exists()) {
      console.log("이미 추첨 번호를 받은 전화번호 입니다.");
      return raffleSnapshot.data().rafNumber as number;
    } else {
      const newRafNumber = await raffleTransaction();

      // 새로운 사용자 문서 생성
      await setDoc(doc(db, "users", phone), {
        phone: phone,
        rafNumber: newRafNumber,
      });
      console.log(
        "추첨 번호가 성공적으로 생성 & 저장되었습니다:",
        phone,
        newRafNumber
      );
      return newRafNumber;
    }
  } catch (error) {
    console.error("추첨 번호 저장 중 에러 발생:", error);
  }
};
