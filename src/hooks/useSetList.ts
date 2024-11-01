import { SetList } from "@@types/setListType";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  updateDoc,
  increment,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export const useSetList = () => {
  const [setList, setSetList] = useState<SetList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const appendLike = async (title: string) => {
    try {
      setIsLoading(true);
      const q = query(collection(db, "setList"), where("title", "==", title));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, { likeCount: increment(1) });
      }
    } catch (err) {
      console.error("추천 수 증가 핸들 함수에서 에러 발생");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeLike = async (title: string) => {
    try {
      setIsLoading(true);
      const q = query(collection(db, "setList"), where("title", "==", title));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        console.log(querySnapshot.docs[0].data().likeCount);
        if (querySnapshot.docs[0].data().likeCount > 0) {
          await updateDoc(docRef, { likeCount: increment(-1) });
        }
      }
    } catch (err) {
      console.error("추천 수 감소 핸들 함수에서 에러 발생");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const q = query(collection(db, "setList"), orderBy("order"));
        const querySnapshot = await getDocs(q);
        setSetList(querySnapshot.docs.map((doc) => doc.data() as SetList));
      } catch (err) {
        console.error("Error fetching set list:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  return { setList, isLoading, appendLike, removeLike };
};
