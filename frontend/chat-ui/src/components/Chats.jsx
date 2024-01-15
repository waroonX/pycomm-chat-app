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

const Chats = () => {
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);

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

    // console.log(chats);
    return (
        <div className="chats">
            {chats?.map((chat) => (
                <div className="userChat" key={chat.chatTitleId}>
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
