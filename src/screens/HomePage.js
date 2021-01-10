import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { sendPassword } from "../store/auth";
import { useHistory } from "react-router-dom";
import paths from "../constants/pathConstants";
import ErrorMessage from "../components/Form/ErrorMessage";
import SubmitButton from "../components/Form/SubmitButton";
import InputForm from "../components/Form/InputForm";
import unlockGif from "../assets/Unlock.gif";

const Wrapper = styled.div`
  width: 50%;
  margin: auto;
  overflow: hidden;
  padding: 0 2rem;
  margin-top: 6rem;
  margin-bottom: 3rem;
  background-color: #252526;
  opacity: 90%;
`;
const Heading = styled.div`
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 50px;
  text-align: center;
`;

const Image = styled.img`
  height: 15%;
  width: 15%;
  margin-top: 20px;
`;

const HomePage = () => {
  const dispatch = useDispatch();
  const { serverPublicKey, key, error, errors } = useSelector(
    (state) => state.auth
  );
  const [password, setPassword] = useState("");
  const history = useHistory();

  if (key) {
    setTimeout(() => {
      history.push(paths.CHAT);
    }, 2000);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (serverPublicKey)
      dispatch(
        sendPassword(
          password,
          serverPublicKey.publicKey,
          serverPublicKey.publicExp
        )
      );
  };
  return (
    <Wrapper>
      <Heading>
        <h1>Enter the password</h1>
        <InputForm
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <SubmitButton
          onClick={handleSubmit}
          value={<i class="lock icon"></i>}
        />{" "}
        <ErrorMessage visible={errors} error={error} />
        {key && <Image src={unlockGif} />}
      </Heading>
    </Wrapper>
  );
};

export default HomePage;
