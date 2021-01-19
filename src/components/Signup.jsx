import React, { useCallback, useRef } from 'react';
import './Signup.scss';

export default function Signup({ onSignup }) {
  const form = useRef();
  const id = useRef();
  const pass = useRef();
  const name = useRef();
  const gender = useRef();
  const birth = useRef();

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      const formData = new FormData(form.current);
      const signUp = {};

      for (const pair of formData) {
        signUp[pair[0]] = pair[1];
      }
      onSignup(formData);

      console.log(onSignup(signUp));
    },
    [onSignup],
  );

  return (
    <div className="Signup">
      <h1>만나서 반가워요!</h1>
      <p>알찬 하루를 보낼 준비가 됐나요?</p>
      <form ref={form} onSubmit={onSubmit}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <input type="text" required name="user-id" ref={id} />
        </div>
        <div>
          <label htmlFor="user-pass">비밀번호</label>
          <input type="password" required name="user-pass" ref={pass} />
        </div>
        <div>
          <label htmlFor="user-repass">비밀번호</label>
          <input type="password" required name="user-repass" />
        </div>
        <div>
          <label htmlFor="user-name">이름</label>
          <input type="text" required name="user-name" ref={name} />
        </div>
        <div>
          <label>성별</label>
          <ul className="gender-list">
            <li>
              <label>
                <input type="radio" name="gender" ref={gender} value="남" />남
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="gender" ref={gender} value="여" />여
              </label>
            </li>
          </ul>
        </div>
        <div>
          <label htmlFor="user-birth">생년월일</label>
          <input type="text" required name="user-birth" ref={gender} />
        </div>
        <div class="check-div">
          <label>
            <input type="checkbox" />
            마이루틴의 이용약관과 개인정 취급방식에 동의합니다.
          </label>
        </div>
        <button type="submit">하루 관리 시작하기</button>
      </form>
    </div>
  );
}
