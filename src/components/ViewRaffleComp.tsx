interface Props {
  raffleNum: string;
  phoneNum: string;
}

function ViewRaffleComp({ raffleNum, phoneNum }: Props): JSX.Element {
  return (
    <div className="p-16 flex flex-col justify-center items-center text-slate-200">
      <h1 className="text-3xl text-center font-bold">추첨권 조회</h1>
      <p className="text-[110px]">{raffleNum}</p>
      <p className="text-sm">
        {phoneNum.slice(0, 3)}-{phoneNum.slice(3, 7)}-{phoneNum.slice(7)}
      </p>
      <p className="text-xs mt-4">
        공연 1부와 2부 사이에 추첨 이벤트가 진행됩니다
      </p>
    </div>
  );
}

export default ViewRaffleComp;
