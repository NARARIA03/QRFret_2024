import { useState } from "react";
import { saveRaffleNumber } from "@apis/saveRaffleNumber";
import { setCookie } from "@utils/cookie";
import Loading from "./Loading";

interface Props {
  setCookieRafNum: React.Dispatch<React.SetStateAction<string | null>>;
  setCookiePhoneNum: React.Dispatch<React.SetStateAction<string | null>>;
}

function InputPhoneComp({
  setCookieRafNum,
  setCookiePhoneNum,
}: Props): JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * @description 전화번호 입력이 적절한지 확인하는 함수
   */
  const validatePhoneNum = (phoneNum: string) => {
    const phoneRegex = /^010\d{8}$/;
    return phoneRegex.test(phoneNum);
  };

  /**
   * @description 전화번호 입력 발생 시 동작하는 이벤트 핸들러
   */
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자가 아닌 모든 문자를 빈 문자로 대체 -> 숫자만 남김
    const numericValue = e.target.value.replace(/\D/g, "");
    setPhoneNumber(numericValue);

    if (validatePhoneNum(numericValue)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  /**
   * @description 참여하기 버튼 클릭 이벤트 핸들러
   */
  const handleSubmit = async () => {
    if (!phoneNumber || !isValid) {
      alert("전화번호를 확인해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      const rafNumber = await saveRaffleNumber(phoneNumber);
      if (!rafNumber) {
        alert("응답이 올바르지 않습니다. 다시 시도해주세요.");
        return;
      }

      setCookie("rafNumber", rafNumber.toString());
      setCookie("phoneNumber", phoneNumber.toString());
      setCookieRafNum(rafNumber.toString());
      setCookiePhoneNum(phoneNumber.toString());
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-16 flex flex-col justify-center items-center text-slate-300">
      <Loading isLoading={isLoading} />
      <h1 className="text-3xl text-center font-bold">추첨권 등록</h1>
      <p className="mt-4 text-sm">추첨을 위해 전화번호를 입력해주세요</p>
      <input
        type="text"
        value={phoneNumber}
        onChange={handleInput}
        placeholder="010XXXXXXXX"
        maxLength={11}
        className={`${
          isValid ? "border-green-500" : "border-red-500"
        } w-full border-2 bg-zinc-800 p-2 mx-2 my-1 rounded-lg focus:outline-none`}
      />
      {!isValid && (
        <p className="self-end text-xs text-red-500">
          올바른 전화번호를 입력해주세요.
        </p>
      )}
      <button
        onClick={handleSubmit}
        className="w-full p-2 m-2 mt-6 border rounded-lg"
      >
        추첨권 등록하기
      </button>
      <p className="text-xs self-start mt-4">
        공연 1부와 2부 사이에 관객 여러분들을 위한 경품 추첨 이벤트가
        진행됩니다.
      </p>
      <p className="text-xs self-start">
        다양한 상품이 준비되어 있으니, 전화번호를 입력해 추첨 이벤트에
        참여해보세요!
      </p>
    </div>
  );
}

export default InputPhoneComp;
