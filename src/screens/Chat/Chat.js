import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import paths from "../../constants/pathConstants";
import { sendMessage, getMessages } from "../../store/chat";
import MessageItem from "../../components/Chat/MessageItem";
import {
  Wrapper,
  Container,
  Messages,
  InputDiv,
  Input,
  Button,
} from "./ChatStyle";

const Chat = () => {
  const dispatch = useDispatch();
  const { key } = useSelector((state) => state.auth);
  const chat = useSelector((state) => state.chat);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  if (!key) window.location = paths.HOME_PAGE;

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({
      behavior: "auto",
      block: "nearest",
    });
    dispatch(getMessages(key));
  }, []);

  useEffect(() => {
    setMessages(chat.messages);
  }, [chat.loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    dispatch(sendMessage(msg, key));
    setMessages([...messages, { text: msg }]);
    setMsg("");
  };
  const list = [];
  messages.map((msg) => list.push(<MessageItem data={msg.text} />));

  return (
    <Wrapper>
      <Container>
        <h1 style={{ textAlign: "center" }}>Chat</h1>
        <Messages>
          {messages.length > 0 && list}
          <div ref={messagesEndRef} />
        </Messages>
        <InputDiv>
          <Input
            value={msg}
            placeholder="Type your message"
            onChange={(e) => setMsg(e.target.value)}
          />
          <Button onClick={handleSubmit}>
            <i class="paper plane outline icon"></i>{" "}
          </Button>
        </InputDiv>
      </Container>
    </Wrapper>
  );
};

export default Chat;
