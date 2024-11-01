import Footer from "@components/Footer";
import { useLogoClick } from "@hooks/useLogoClick";
import { Link } from "react-router-dom";

function LandingPage(): JSX.Element {
  // 로고를 5초 안에 10번 클릭하면
  // 비밀번호를 확인받고 DevPage로 이동시키는 함수를 반환하는 커스텀 훅
  const handleLogoClick = useLogoClick();

  return (
    <>
      <div className="bg-zinc-950 w-screen min-h-screen flex flex-col justify-between text-slate-200">
        <div className="w-full flex justify-center" onClick={handleLogoClick}>
          <img src="/images/header.png" className="object-cover w-full" />
        </div>
        <div className="flex w-full flex-col justify-center items-center mb-16">
          <h1 className="text-3xl text-center font-bold mt-4">
            14Fret 정기공연: PRISM
          </h1>
          <Link
            to="/raffle"
            className="w-1/2 border bg-zinc-900 py-3 px-12 mt-12 rounded-lg hover:bg-zinc-600 text-center"
          >
            추첨 이벤트 참여
          </Link>
          <Link
            to="/setlist"
            className="w-1/2 border bg-zinc-900 py-3 px-12 mt-4 rounded-lg hover:bg-zinc-600 text-center"
          >
            공연 셋리스트
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default LandingPage;
