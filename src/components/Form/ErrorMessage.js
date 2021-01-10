import React from "react";
import styled from "styled-components";

const Error = styled.div`
  color: white;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  background-color: #ca0b00;
  padding: 10px;
  border-radius: 5px;
`;

const ErrorMessage = ({ error, visible }) => {
  if (!visible || !error) return null;
  return <Error>{error}</Error>;
};
export default ErrorMessage;
