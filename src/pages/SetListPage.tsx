import Footer from "@components/Footer";
import Loading from "@components/Loading";
import { useLogoClick } from "@hooks/useLogoClick";
import { useSetList } from "@hooks/useSetList";
import { getLocalStorage, setLocalStorage } from "@utils/localStorage";
import { useEffect, useState } from "react";

function SetListPage() {
  // 로고를 5초 안에 10번 클릭하면
  // 비밀번호를 확인받고 DevPage로 이동시키는 함수를 반환하는 커스텀 훅
  const handleLogoClick = useLogoClick();

  const [likeSongs, setLikeSongs] = useState<string[]>([]);
  const { setList, isLoading, appendLike, removeLike } = useSetList();

  const handleIncrease = async (title: string) => {
    if (likeSongs.includes(title)) {
      alert("이미 추천한 곡입니다.");
      return;
    }
    if (likeSongs.length >= 5) {
      alert("최대 5곡까지 추천할 수 있습니다.");
      return;
    }
    await appendLike(title);
    const newLikeSongs = [...likeSongs, title];
    setLikeSongs(newLikeSongs);
    setLocalStorage("likedSongs", JSON.stringify(newLikeSongs));
  };

  const handleDecrease = async (title: string) => {
    if (!likeSongs.includes(title)) {
      alert("아직 추천하지 않은 곡입니다.");
      return;
    }
    await removeLike(title);
    const newLikeSongs = [...likeSongs.filter((t) => t !== title)];
    setLikeSongs(newLikeSongs);
    setLocalStorage("likedSongs", JSON.stringify(newLikeSongs));
  };

  useEffect(() => {
    const savedLikeSongs: string[] = JSON.parse(
      getLocalStorage("likedSongs") || "[]"
    );
    setLocalStorage("likedSongs", JSON.stringify(savedLikeSongs));
    setLikeSongs(savedLikeSongs);
  }, []);

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="w-full flex justify-center" onClick={handleLogoClick}>
        <img src="/images/header.png" className="object-cover w-full" />
      </div>
      <div className="bg-zinc-950 text-slate-200 w-screen min-h-screen flex flex-col gap-6 p-6">
        <h1 className="text-3xl text-center font-bold mt-4">공연 세트리스트</h1>
        {setList.map((set, index) => (
          <div className="bg-zinc-900 rounded-lg p-6 space-y-4" key={index}>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-gray-200">
                {set.order}. {set.title}
              </h2>
              <h3 className="text-slate-400 text-sm">{set.artist}</h3>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-slate-200 text-sm">
              {set.vocal.length !== 0 && (
                <p>
                  <span className="font-semibold">Vo.</span>{" "}
                  {set.vocal.join(", ")}
                </p>
              )}
              {set.guitar.length !== 0 && (
                <p>
                  <span className="font-semibold">Gt.</span>{" "}
                  {set.guitar.join(", ")}
                </p>
              )}
              {set.bass.length !== 0 && (
                <p>
                  <span className="font-semibold">Ba.</span>{" "}
                  {set.bass.join(", ")}
                </p>
              )}
              {set.drum.length !== 0 && (
                <p>
                  <span className="font-semibold">Dr.</span>{" "}
                  {set.drum.join(", ")}
                </p>
              )}
              {set.keyboard.length !== 0 && (
                <p>
                  <span className="font-semibold">Kb.</span>{" "}
                  {set.keyboard.join(", ")}
                </p>
              )}
              {set.chorus.length !== 0 && (
                <p>
                  <span className="font-semibold">Ch.</span>{" "}
                  {set.chorus.join(", ")}
                </p>
              )}
            </div>

            <div className="flex justify-end items-center pt-4 text-slate-400">
              <button
                className="bg-red-500 hover:bg-red-600 text-slate-200 font-semibold py-1 px-4 rounded"
                onClick={() => {
                  if (likeSongs.includes(set.title)) {
                    handleDecrease(set.title);
                  } else {
                    handleIncrease(set.title);
                  }
                }}
              >
                {likeSongs.includes(set.title)
                  ? "추천 취소하기"
                  : "👍🏻 추천하기"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default SetListPage;
