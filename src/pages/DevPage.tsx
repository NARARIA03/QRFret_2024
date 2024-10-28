import { getAllRaffleData } from "@apis/getAllRaffleData";
import { resetAllRaffleData } from "@apis/resetAllRaffleData";
import { resetLikeCount } from "@apis/resetLikeCount";
import { removeCookie } from "@utils/cookie";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DevPage(): JSX.Element | null {
  const navigate = useNavigate();
  const [raffleData, setRaffleData] = useState<DocumentData[] | null>(null);

  const handleClearRaffleDataBtn = async () => {
    const password = window.prompt("비밀번호를 입력하세요");
    if (password === import.meta.env.VITE_DEV_CLEAR_PASSWORD) {
      await resetAllRaffleData();
    } else {
      alert("비밀번호가 틀렸습니다");
    }
  };

  const handleClearLikeCount = async () => {
    const password = window.prompt("비밀번호를 입력하세요");
    if (password === import.meta.env.VITE_DEV_CLEAR_PASSWORD) {
      await resetLikeCount();
    } else {
      alert("비밀번호가 틀렸습니다");
    }
  };

  const handleClearCookieBtn = () => {
    removeCookie("phoneNumber");
    removeCookie("rafNumber");
    alert("쿠키 삭제 완료");
    navigate("/");
  };

  const fetchRaffleData = async () => {
    const fetchedData = await getAllRaffleData();
    setRaffleData(fetchedData);
  };

  useEffect(() => {
    const isDev = localStorage.getItem("isDev");
    if (isDev) {
      fetchRaffleData();
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!raffleData) return null;

  return (
    <div className="bg-zinc-950 w-screen min-h-screen pb-32 text-slate-200">
      <div className="w-full flex justify-center">
        <img src="/images/poster.jpeg" />
      </div>
      <div className="w-full mt-8 flex flex-col items-center">
        <button
          className="px-2 py-1 w-8/12 border rounded-lg m-2 mb-4"
          onClick={handleClearRaffleDataBtn}
        >
          추첨권 데이터 초기화 (DB 리셋)
        </button>
        <button
          className="px-2 py-1 w-8/12 border rounded-lg m-2 mb-4"
          onClick={handleClearLikeCount}
        >
          곡 좋아요 수 초기화 (DB 리셋)
        </button>
        <button
          className="px-2 py-1 w-8/12 border rounded-lg m-2 mb-4"
          onClick={handleClearCookieBtn}
        >
          해당 기기 쿠키 제거
        </button>
        <h1 className="text-xl font-bold mb-4">추첨 이벤트 참여 명단 데이터</h1>
        <table className="w-8/12">
          <thead>
            <tr>
              <th scope="col" className="border px-2 py-1">
                추첨번호
              </th>
              <th scope="col" className="border px-2 py-1">
                전화번호
              </th>
            </tr>
          </thead>
          <tbody>
            {raffleData.map((data) => (
              <tr key={data.phone}>
                <th className="text-sm border px-2 py-1">{data.rafNumber}</th>
                <th className="text-sm border px-2 py-1">{data.phone}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DevPage;
