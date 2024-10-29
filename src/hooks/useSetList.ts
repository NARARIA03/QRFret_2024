import { SetList } from "@@types/setListType";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  updateDoc,
  increment,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export const useSetList = () => {
  const [setList, setSetList] = useState<SetList[]>([]);

  const appendLike = async (title: string) => {
    try {
      const q = query(collection(db, "setList"), where("title", "==", title));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, { likeCount: increment(1) });
      }
    } catch (err) {
      console.error("추천 수 증가 핸들 함수에서 에러 발생");
      console.error(err);
    }
  };

  const removeLike = async (title: string) => {
    try {
      const q = query(collection(db, "setList"), where("title", "==", title));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, { likeCount: increment(-1) });
      }
    } catch (err) {
      console.error("추천 수 감소 핸들 함수에서 에러 발생");
      console.error(err);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "setList"), orderBy("order"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setSetList(querySnapshot.docs.map((doc) => doc.data() as SetList));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { setList, appendLike, removeLike };
};
