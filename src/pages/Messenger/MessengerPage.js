import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";

import {
  GET_MY_CONVERSATION,
  GET_MESSAGES_OF_CONVERSATION,
  CREATE_MESSAGE_SERVICE,
} from "../../service";
import { spinnerActions } from "../../store/Spinner/spinner-state";
import { modalActions } from "../../store/Modal/modal-state";

import NavBar from "../../components/Navigation/NavBar";
import RightBar from "../../components/RightBar/RightBar";
import Conversation from "../../components/Conversation/Conversation";
import Message from "../../components/Message/Message";
import MessageBox from "../../components/Message/MessageBox";
import ChatBoxInfo from "../../components/Message/ChatBoxInfo";

import classes from "./MessengerPage.module.css";

function MessengerPage() {
  const { token, userId } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState();

  const socket = useRef();
  const scrollRef = useRef();

  //? SOCKET MANAGE

  useEffect(() => {
    socket.current = io("ws://127.0.0.1:3000");
    // socket.current = io("https://socialapp-minnphuc.netlify.app");

    // Online users
    socket.current?.on("getUsers", users => {
      setOnlineUsers(users);
      // console.log(users);
    });

    // Arrival message
    socket.current?.on("getMessage", message => {
      setArrivalMsg({
        user: message.senderId,
        content: message.content,
        sendedAt: Date.now(),
      });
    });

    return () => {
      socket.current.close();
    };
  }, []);

  useEffect(() => {
    socket.current?.emit("addUser", userId);
  }, [userId]);

  useEffect(() => {
    arrivalMsg &&
      currentChat?.members.map(m => m._id).includes(arrivalMsg.user) &&
      setMessages(state => [...state, arrivalMsg]);
  }, [arrivalMsg, currentChat]);

  //? GET ALL CONVERSATION

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch(GET_MY_CONVERSATION, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const { data } = await res.json();

        if (!res.ok) throw new Error(data.message);

        setConversations(data.conversations);
      } catch (error) {
        throw error;
      }
    };

    dispatch(spinnerActions.open());
    fetchConversations()
      .then(() => dispatch(spinnerActions.close()))
      .catch(() => {
        dispatch(
          modalActions.open({
            content: "Failed to fetch chat data. Please try again later.",
            type: "error",
          })
        );
        dispatch(spinnerActions.close());
      });
  }, [userId, dispatch, token]);

  //? GET MESSAGE OF SELECTED CONVERSATION

  useEffect(() => {
    if (!currentChat) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(GET_MESSAGES_OF_CONVERSATION(currentChat._id));

        const { data } = await res.json();

        if (!res.ok) throw new Error(data.message);

        setMessages(data.messages);
      } catch (error) {
        throw error;
      }
    };

    dispatch(spinnerActions.open());
    fetchMessages()
      .then(() => dispatch(spinnerActions.close()))
      .catch(() => {
        dispatch(
          modalActions.open({
            content: "Failed to fetch conversation data. Please try again later.",
            type: "error",
          })
        );
        dispatch(spinnerActions.close());
      });
  }, [currentChat, dispatch]);

  //? SEND NEW MESSAGE

  const addMessage = async msgContent => {
    dispatch(spinnerActions.open());

    const receiver = currentChat.members.find(member => member._id !== userId);

    socket.current?.emit("sendMessage", {
      userId,
      receiverId: receiver._id,
      msg: msgContent,
    });

    try {
      const res = await fetch(CREATE_MESSAGE_SERVICE, {
        method: "POST",
        body: JSON.stringify({
          conversation: currentChat._id,
          content: msgContent,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const { data } = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMessages(state => [...state, data.message]);
    } catch (error) {
      dispatch(
        modalActions.open({
          content: error.message,
          type: "error",
        })
      );
    }

    dispatch(spinnerActions.close());
  };

  // Scroll down when a message is added
  useEffect(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  // Search
  const searchHandler = e => setSearchVal(e.target.value);

  // JSX

  const conversationList = conversations.map(c => (
    <Conversation
      key={c._id}
      data={c}
      currentUser={userId}
      onClick={() => setCurrentChat(c)}
      query={searchVal}
    />
  ));

  const messageList = messages.map(m => (
    <div key={m._id} ref={scrollRef}>
      <Message key={m._id} data={m} own={m.user === userId} conversation={currentChat} />
    </div>
  ));

  return (
    <>
      <NavBar />
      <div className={classes.messenger}>
        <div className={classes["chat-menu"]}>
          <p>Chat</p>
          <input onChange={searchHandler} type="text" placeholder="Search for user" />
          {conversationList}
        </div>

        <div className={classes["chat-box"]}>
          {currentChat ? (
            <>
              <ChatBoxInfo
                member={currentChat.members.find(member => member._id !== userId)}
                onlineUsers={onlineUsers}
              />

              <div className={classes["chat-box-top"]}>{messageList}</div>

              <div className={classes["chat-box-bottom"]}>
                <MessageBox onNewMessage={addMessage} />
              </div>
            </>
          ) : (
            <span className={classes["no-conversation-msg"]}>
              Select a chat on the left or start a new one
            </span>
          )}
        </div>

        <RightBar onlineUsers={onlineUsers} onChat={setCurrentChat} />
      </div>
    </>
  );
}

export default MessengerPage;
