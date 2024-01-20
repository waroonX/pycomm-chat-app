import React, { useContext, useEffect, useState } from "react";
import Message from "./Message.jsx";
import { ChatContext } from "../context/ChatContext.jsx";
import {
    collection,
    collectionGroup,
    doc,
    getDocs,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { db } from "../firebase.jsx";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const chatRef = collection(
                db,
                `userInfo/${data.uid}/userChats/${data.chatTitleId}/chatMessages`
            );
            const q = query(chatRef, where("isActive", "==", true));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                setMessages(querySnapshot.docs.map((doc) => doc.data()));
            });
            return () => {
                unsubscribe();
            };
        };
        data.chatTitleId && getChats();
    }, [data.chatTitleId]);
    return (
        <div className="messages">
            {messages?.map((message) => (
                <Message msgInfo={message} key={message.messageId} />
            ))}
        </div>
    );
};

export default Messages;
