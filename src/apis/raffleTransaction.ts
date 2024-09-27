import { doc, runTransaction } from "firebase/firestore";
import { db } from "../firebase";

/**
 * @description transaction을 이용해 겹치지 않도록 하나씩 증가하는 추첨번호를 구하는 함수
 * @returns 새로운 추첨번호 반환
 */
export const raffleTransaction = async () => {
  try {
    const newRafNum = await runTransaction(db, async (transaction) => {
      const rafNumber = await transaction.get(doc(db, "users", "rafNumber"));
      if (!rafNumber.exists()) {
        throw "rafNumber is not exist";
      }

      const newRafNum: number = rafNumber.data().rafNumber + 1;
      transaction.update(doc(db, "users", "rafNumber"), {
        rafNumber: newRafNum,
      });
      console.log("Transaction successfully committed!");
      return newRafNum;
    });
    return newRafNum;
  } catch (err) {
    console.log(`transaction err: ${err}`);
  }
};
