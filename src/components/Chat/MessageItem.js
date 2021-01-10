import React from "react";
import styled from "styled-components";

const Msg = styled.div`
  background-color: #2deadd;
  color: black;
  padding: 10px;
  margin-top: 5px;
  max-width: 20%;
  border-radius: 50px;
  line-height: 26px;
  font-weight: 600;
`;

const MessageItem = ({ data }) => {
  return <Msg>{data}</Msg>;
};
export default MessageItem;
