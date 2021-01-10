import styled from "styled-components";

export const Wrapper = styled.div`
  width: 60%;
  margin: auto;
  overflow: hidden;
  padding: 0 2rem;
  margin-top: 6rem;
  margin-bottom: 3rem;
  background-color: #252526;
  justify-content: center;
  align-items: center;
  opacity: 90%;
`;
export const Messages = styled.div`
  width: 100%;
  max-height: 700px;
  background-color: #18191a;
  padding: 20px;
  overflow: scroll;
`;
export const InputDiv = styled.div`
  display: inline;
  padding-bottom: 30px;
`;
export const Button = styled.button`
  width: 10%;
  background-color: #2deadd;
  color: black;
  font-weight: bold;
  padding: 14px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
export const Input = styled.input`
  width: 90%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const Container = styled.div`
  padding: 10px;
`;
