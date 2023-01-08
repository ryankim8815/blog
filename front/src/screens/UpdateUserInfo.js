import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../components/utils/Api";
import styled from "styled-components";
import SocialLoginBox from "../components/user/SocialLogin";
import { UserStateContext, DispatchContext } from "../App";

const PageNameDiv = styled.div`
  background: linear-gradient(135deg, #342a97, #9d95da);
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center; // 상하 정렬
`;
const PageNameLeftDiv = styled.div`
  width: 50%;
  height: 100%;
  padding-left: 40px;
  display: flex;
  align-items: center;
  justify-content: left;
  // background-color: blue; // 영역확인용

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    padding-left: 20px;
  }
`;
const PageNameTitle = styled.span`
  font-weight: 100;
  color: #ffffff;
  font-size: 24px;
  display: flex;
  justify-content: center; // 좌우 정렬
  // background-color: pink; // 영역확인용
`;

const SignupBoxDiv = styled.div`
  width: 100%;
  margin: auto 0px;
  display: inline-block;
  text-align: center; // display를 inline으로 했기 때문에 정렬 가능
  justify-content: center; // 좌우 정렬
  padding: 120px 0;
  @media screen and (max-width: 500px) {
    padding: 30px 0;
  }
`;
const SignupBox = styled.div`
  width: 80%;
  max-width: 500px;
  text-align: center;
  justify-content: center; // 좌우 정렬
  display: inline-block;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: 400;
  color: black;
`;

// 상하간격 스페이서
const SpacerSmallDiv = styled.div`
  width: 100%;
  padding: 2px 0;
  margin: 0 auto;
  display: flex;
`;
const SpacerDiv = styled.div`
  width: 100%;
  padding: 5px 0;
  margin: 0 auto;
  display: flex;
`;
const SpacerBigDiv = styled.div`
  width: 100%;
  padding: 10px 0;
  margin: 0 auto;
  display: flex;
`;

const ValidationP = styled.p`
  width: 400px;
  width: 95%;
  max-width: 500px;
  height: 22px;
  padding: 0px 0 0 0px;
  margin: 0px;
  text-indent: 1em;
  font-size: 14px;
  font-weight: 400;
  color: #ff7f7f;
  text-align: left;
`;

const CheckButton = styled.button`
  width: 95%;
  min-width: 100px;
  max-width: 500px;
  height: 40px;
  border-radius: 2px;
  border: 1px solid #e1e1e1;
  background-color: #835dfe;
  font-size: 15px;
  font-weight: 400;
  color: white;
  margin: 0px auto;
  // display: block;
  &:hover {
    // background-color: #e5e5e5;
    background-color: #7044ff;
  }
  &:disabled {
    color: gray;
    background-color: #e1e1e1;
  }
`;

const SignupInput = styled.input`
  width: 95%;
  min-width: 200px;
  max-width: 500px;
  height: 40px;
  border-radius: 2px;
  border: 1px solid #e1e1e1;
  text-indent: 1em;
  font-size: 15px;
  font-weight: 400;
  color: gray;
  margin: 0px 0px 0px 0;
  padding: 0 0 0 0;
  &:focus {
    outline: 2px solid #daadff;
  }
`;

const SignupButton = styled.button`
  width: 95%;
  max-width: 500px;
  height: 40px;
  border-radius: 2px;
  border: 1px solid #e1e1e1;
  background-color: #835dfe;
  font-size: 15px;
  font-weight: 400;
  color: white;
  margin: 30px 0px 0 0;
  padding: 0px 0px;
  &:hover {
    background-color: #7044ff;
  }
`;

const DivisionLine = styled.div`
  border-top: 1px solid lightgray;
  margin: 40px auto;
  width: 100%;
`;

function UpdateUserInfo() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  const currentNickname = userState.user.nickname;

  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  //각 항목 조건이 맞지 않을 때 띄우는 메시지
  const [currentPwdMsg, setCurrentPwdMsg] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [confirmPwdMsg, setConfirmPwdMsg] = useState("");
  const [nicknameMsg, setNicknameMsg] = useState("");

  // 현재 비밀번호 확인, 닉네임 중복 확인
  const [checkPassword, setCheckPassword] = useState(false);
  //   const [checkNickname, setCheckNickname] = useState(false);
  const checkNickname = useRef(false);

  const isAllChecked = checkPassword && checkNickname;

  // 변동사항 여부 확인
  const [changePassword, setChangePassword] = useState(false);
  const [changeNickname, setChangeNickname] = useState(false);

  const isAllNotChanged = !changePassword && !changeNickname;

  // 닉네임 유효성 검사
  const validateNickname = (nickname) => {
    return nickname
      .toLowerCase()
      .match(/^([가-힣0-9]{2,8}|[A-Za-z0-9]{2,12})$/);
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password) => {
    return password.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    );
  };
  const validateConfirmPassword = (confirmPassword) => {
    const confirmPasswordResult = password === confirmPassword;
    return confirmPasswordResult;
  };

  // validation
  const isNicknameValid = validateNickname(nickname);
  const isPwdValid = validatePassword(password);
  const isConfirmPwdValid = validateConfirmPassword(confirmPassword);

  // 화면에서 가리기
  function elementShow(idName) {
    const target = document.getElementById(idName);
    target.style.display = "block";
  }

  function elementHide(idName) {
    const target = document.getElementById(idName);
    target.style.display = "none";
  }

  // [1-1] 비밀번호 입력
  const onChangePassword = useCallback(async (e) => {
    e.preventDefault();
    // const currentEmail = await e.target.value;
    const checkPassword = await e.target.value;
    setCurrentPassword(checkPassword);
    if (!checkPassword) {
      setIsDisabled(true);
      setCurrentPwdMsg(null);
    } else if (!validatePassword(checkPassword)) {
      setIsDisabled(true);
      setCurrentPwdMsg("비밀번호 형식이 올바르지 않습니다.");
    } else {
      setIsDisabled(false);
      setCurrentPwdMsg(null);
    }
  });

  // [1-2] 비밀번호 확인
  const onCheckPassword = async (e) => {
    e.preventDefault();
    try {
      setUserId(userState.user.user_id);
      const email = userState.user.email;
      const res = await Api.post("signin", {
        email: email,
        password: currentPassword,
      });
      const { result } = res.data;
      if (!result) {
        setCurrentPwdMsg("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
        setCheckPassword(false);
      } else {
        setCurrentPwdMsg(null);
        setCheckPassword(true);
        elementHide("checkPasswordInputGroupDiv");
        setIsDisabled(true);
        elementShow("changePasswordInputGroupDiv");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // [2-1] 비밀번호 입력
  // 비밀번호
  const onChangePwd = useCallback(async (e) => {
    const currPwd = await e.target.value;
    setPassword(currPwd);
    if (!validatePassword(currPwd)) {
      setPwdMsg("영문, 숫자, 특수기호 조합으로 10자리 이상 입력해주세요.");
      setIsDisabled(true);
    } else if (validatePassword(currPwd) && currPwd !== confirmPassword) {
      setPwdMsg("동일한 비밀번호를 한번 더 입력해주세요.");
      setIsDisabled(true);
    } else {
      setPwdMsg(null);
    }
  });

  // 비밀번호 확인
  const onChangeConfirmPwd = useCallback(async (e) => {
    const currConfirmPwd = await e.target.value;
    setConfirmPassword(currConfirmPwd);
    if (password !== currConfirmPwd) {
      setPwdMsg("비밀번호가 일치하지 않습니다.");
      setIsDisabled(true);
    } else if (
      password == currConfirmPwd &&
      !validatePassword(currConfirmPwd)
    ) {
      setPwdMsg("영문, 숫자, 특수기호 조합으로 10자리 이상 입력해주세요.");
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
      setPwdMsg(null);
    }
  });

  // [2-2] 비밀번호 변경
  const onSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      if (isPwdValid && isConfirmPwdValid) {
        setChangePassword(true);
        elementHide("changePasswordInputGroupDiv");
        setIsDisabled(true);
        elementShow("changeNicknameInputGroupDiv");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // [2-3] 비밀번호 유지
  const onPassPassword = async (e) => {
    e.preventDefault();
    try {
      if (checkPassword) {
        setPassword(currentPassword);
        elementHide("changePasswordInputGroupDiv");
        setIsDisabled(true);
        elementShow("changeNicknameInputGroupDiv");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // [3-1] 닉네임 입력
  const onChangeNickname = useCallback(async (e) => {
    e.preventDefault();
    const currNickname = await e.target.value;
    setNickname(currNickname);
    if (!validateNickname(currNickname)) {
      setIsDisabled(true);
      setNicknameMsg(
        "한글+숫자는 2~8글자, 영어+숫자는 2~12글자로 입력해주세요."
      );
    } else if (currNickname == currentNickname) {
      setIsDisabled(true);
      setNicknameMsg("현재 닉네임과 동일합니다.");
    } else {
      setIsDisabled(false);
      setNicknameMsg(null);
    }
  }, []);

  // [3-2] 닉네임 중복확인
  const onCheckNickname = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.get(`signup/nickname/${nickname}`);
      const { result } = res.data;
      if (result) {
        // setCheckNickname(true);
        checkNickname.current = true;
        setChangeNickname(true);
        if (isAllChecked) {
          const apiResult = await Api.put("user", {
            currentPassword: currentPassword,
            password: password,
            nickname: nickname,
          });
          const { result } = apiResult.data;
          if (result) {
            navigate("/", {
              state: {
                nicknameRef: nickname,
              },
            });
          } else {
            throw "유저 정보 업데이트 api에서 오류가 발생했습니다.";
          }
        }
      } else {
        setNicknameMsg("이미 등록된 닉네임입니다. 다시 입력해주세요.");
        // setCheckNickname(false);
        checkNickname.current = false;
      }
    } catch (err) {
      console.log(err);
    }
  };
  // [3-3] 닉네임 유지 - useState update에 딜레이 발생
  const onPassNickname = async (e) => {
    e.preventDefault();
    try {
      setNickname(currentNickname);
      //   setCheckNickname(true);
      checkNickname.current = true;
      if (checkPassword && !changePassword) {
        navigate("/");
      } else if (checkPassword) {
        const apiResult = await Api.put("user", {
          currentPassword: currentPassword,
          password: password,
          nickname: nickname,
        });
        const { result } = apiResult.data;
        if (result) {
          navigate("/", {
            state: {
              nickname: nickname,
            },
          });
        } else {
          throw "유저 정보 업데이트 api에서 오류가 발생했습니다.";
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // [only-2] 닉네임 중복확인
  const onCheckNicknameOnly = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.get(`signup/nickname/${nickname}`);
      const { result } = res.data;
      if (result) {
        checkNickname.current = true;
        setChangeNickname(true);
        const apiResult = await Api.patch("user", {
          nickname: nickname,
          provider: userState.user.provider,
        });
        const { result } = apiResult.data;
        if (result) {
          navigate("/", {
            state: {
              nicknameRef: nickname,
            },
          });
        } else {
          throw "유저 정보 업데이트 api에서 오류가 발생했습니다.";
        }
      } else {
        setNicknameMsg("이미 등록된 닉네임입니다. 다시 입력해주세요.");
        checkNickname.current = false;
      }
    } catch (err) {
      console.log(err);
    }
  };
  // [only-3] 닉네임 유지 - useState update에 딜레이 발생
  const onPassNicknameOnly = async (e) => {
    e.preventDefault();
    try {
      setNickname(currentNickname);
      checkNickname.current = true;
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userState.user.provider == "dogfoot") {
      elementShow("checkPasswordInputGroupDiv");
      elementHide("changePasswordInputGroupDiv");
      elementHide("changeNicknameInputGroupDiv");
      elementHide("changeOnlyNicknameInputGroupDiv");
    } else {
      elementHide("checkPasswordInputGroupDiv");
      elementHide("changePasswordInputGroupDiv");
      elementHide("changeNicknameInputGroupDiv");
      elementShow("changeOnlyNicknameInputGroupDiv");
    }
  }, []);

  return (
    <>
      <PageNameDiv>
        <PageNameLeftDiv>
          <PageNameTitle>UPDATING</PageNameTitle>
        </PageNameLeftDiv>
      </PageNameDiv>
      <SignupBoxDiv>
        <SignupBox>
          <Title>회원정보 변경</Title>
          <div id="checkPasswordInputGroupDiv" display="block">
            <SignupInput
              name="password"
              type="password"
              placeholder="비밀번호"
              onChange={onChangePassword}
            />
            <ValidationP>{currentPwdMsg}</ValidationP>
            <SpacerBigDiv />
            <CheckButton
              id="sendCodeButton"
              onClick={onCheckPassword}
              disabled={isDisabled}
            >
              비밀번호 확인
            </CheckButton>
          </div>

          <div id="changePasswordInputGroupDiv" display="none">
            <SignupInput
              name="password"
              type="password"
              placeholder="비밀번호"
              onChange={onChangePwd}
            />
            <SpacerSmallDiv />
            <SignupInput
              name="confirmPassword"
              type="password"
              placeholder="비밀번호 확인"
              onChange={onChangeConfirmPwd}
            />
            <ValidationP>{pwdMsg}</ValidationP>
            <SpacerBigDiv />
            <CheckButton onClick={onSubmitPassword} disabled={isDisabled}>
              새로운 비밀번호로 변경하기
            </CheckButton>

            <CheckButton onClick={onPassPassword} disabled={null}>
              기존 비밀번호 유지하기
            </CheckButton>
          </div>
          <div id="changeNicknameInputGroupDiv" display="none">
            <SignupInput
              name="nickname"
              type="text"
              placeholder="닉네임"
              onChange={onChangeNickname}
            />
            <ValidationP>{nicknameMsg}</ValidationP>
            <SpacerBigDiv />
            <CheckButton
              id="checkNicknameButton"
              onClick={onCheckNickname}
              disabled={isDisabled}
            >
              새로운 닉네임으로 변경하기
            </CheckButton>
            <CheckButton
              id="passNicknameButton"
              onClick={onPassNickname}
              disabled={null}
            >
              현재 닉네임 유지하기
            </CheckButton>
          </div>
          <div id="changeOnlyNicknameInputGroupDiv" display="none">
            <SignupInput
              name="nickname"
              type="text"
              placeholder="닉네임"
              onChange={onChangeNickname}
            />
            <ValidationP>{nicknameMsg}</ValidationP>
            <SpacerBigDiv />
            <CheckButton
              id="checkNicknameButton"
              onClick={onCheckNicknameOnly}
              disabled={isDisabled}
            >
              새로운 닉네임으로 변경하기
            </CheckButton>
            <CheckButton
              id="passNicknameButton"
              onClick={onPassNicknameOnly}
              disabled={null}
            >
              현재 닉네임 유지하기
            </CheckButton>
          </div>
        </SignupBox>
      </SignupBoxDiv>
    </>
  );
}

export default UpdateUserInfo;
