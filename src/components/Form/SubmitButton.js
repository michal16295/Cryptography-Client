import React from "react";
import styled from "styled-components";

const Button = styled.div`
  width: 100%;
  background-color: #2deadd;
  color: black;
  font-weight: bold;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SubmitButton = ({ onClick, value }) => {
  return <Button onClick={onClick}>{value}</Button>;
};
export default SubmitButton;
