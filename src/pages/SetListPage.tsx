import { useSetList } from "@hooks/useSetList";
import { motion } from "framer-motion";
import { useState } from "react";

function SetListPage() {
  const [clicked, setClicked] = useState<string | null>(null);
  const { setList, appendLikeCount } = useSetList();

  const handleButtonClick = async (title: string) => {
    setClicked(title);
    await appendLikeCount(title);
    setClicked(null);
  };

  return (
    <div className="bg-zinc-950 text-slate-200 w-screen min-h-screen flex flex-col gap-6 p-6">
      <h1 className="text-3xl text-center font-bold">공연 세트리스트</h1>
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
                <span className="font-semibold">Ba.</span> {set.bass.join(", ")}
              </p>
            )}
            {set.drum.length !== 0 && (
              <p>
                <span className="font-semibold">Dr.</span> {set.drum.join(", ")}
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

          <div className="flex justify-between items-center pt-4">
            <motion.span
              className="text-slate-400"
              key={set.likeCount}
              initial={{ scale: 1 }}
              animate={{ scale: clicked === set.title ? 1.5 : 1 }}
              exit={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              추천 수: {set.likeCount}
            </motion.span>
            <button
              className="bg-red-500 hover:bg-red-600 text-slate-200 font-semibold py-1 px-4 rounded"
              onClick={() => handleButtonClick(set.title)}
            >
              👍🏻 추천하기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SetListPage;
