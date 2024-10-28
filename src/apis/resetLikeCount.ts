import { collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const resetLikeCount = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "setList"));

    const reset = querySnapshot.docs.map((doc) =>
      updateDoc(doc.ref, { likeCount: 0 })
    );
    await Promise.all(reset);

    alert("모든 곡의 likeCount가 0으로 초기화되었습니다.");
  } catch (err) {
    console.error("likeCount 초기화 중 오류 발생:", err);
  }
};
