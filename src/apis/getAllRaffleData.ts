import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getAllRaffleData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const tmp = [
      ...querySnapshot.docs
        .filter((doc) => doc.id !== "rafNumber")
        .sort((a, b) => b.data().rafNumber - a.data().rafNumber)
        .map((doc) => doc.data()),
    ];
    return tmp;
  } catch (e) {
    console.error(e);
    return null;
  }
};
