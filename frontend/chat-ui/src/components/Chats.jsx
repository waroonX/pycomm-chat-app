import {
    collectionGroup,
    doc,
    onSnapshot,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import Close from "../img/close.png";
import Chat from "../img/chatIcon.png";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const chatRef = collectionGroup(db, "userChats");
            const q = query(
                chatRef,
                where("uid", "==", currentUser.uid),
                where("isActive", "==", true)
            );
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                setChats(querySnapshot.docs.map((doc) => doc.data()));
            });
            return () => {
                unsubscribe();
            };
        };
        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleDelete = async (chatTitleId) => {
        try {
            await updateDoc(
                doc(db, "userInfo", currentUser.uid, "userChats", chatTitleId),
                {
                    isActive: false,
                }
            );
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleSelect = (chatTitleId, chatTitleName) => {
        dispatch({
            type: "CHANGE_USER",
            payload: {
                chatTitleId,
                chatTitleName,
                uid: currentUser.uid,
            },
        });
    };

    return (
        <div className="chats">
            {chats
                ?.sort((c1, c2) => (c1.date > c2.date ? -1 : 1))
                .map((chat) => (
                    <div
                        className="userChat"
                        key={chat.chatTitleId}
                        onClick={(e) =>
                            handleSelect(chat.chatTitleId, chat.chatTitleName)
                        }
                    >
                        <img src={Chat} alt="" />
                        <div className="userChatInfo">
                            <span>{chat.chatTitleName}</span>
                            <p>{chat.lastMessage}</p>
                        </div>
                        <div
                            className="userChatIcons"
                            onClick={() => handleDelete(chat.chatTitleId)}
                        >
                            <img src={Close} alt="" />
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Chats;
