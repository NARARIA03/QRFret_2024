import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveRaffleNumber } from "@apis/saveRaffleNumber";
import { setCookie } from "@utils/cookie";

function InputPhoneComp(): React.JSX.Element {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

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
    if (phoneNumber && isValid) {
      const rafNumber: number | undefined = await saveRaffleNumber(phoneNumber);
      if (rafNumber) {
        setCookie("rafNumber", rafNumber.toString());
        setCookie("phoneNumber", phoneNumber.toString());
        navigate(0);
      }
    } else {
      alert("전화번호를 확인해주세요.");
    }
  };

  return (
    <>
      <label htmlFor="phone" className="block text-black">
        추첨을 위해 전화번호를 입력해주세요
      </label>
      <input
        id="phone"
        type="text"
        value={phoneNumber}
        onChange={handleInput}
        placeholder="010XXXXXXXX"
        maxLength={11}
        className={`${
          isValid ? "border-green-500" : "border-red-500"
        } border-2`}
      />
      {!isValid && (
        <p className="text-red-500">올바른 전화번호를 입력해주세요.</p>
      )}
      <button onClick={handleSubmit} className="p-2 border border-purple-500">
        추첨 참여하기
      </button>
    </>
  );
}

export default InputPhoneComp;
