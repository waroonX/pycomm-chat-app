import React, { useContext, useState } from "react";
import AddChat from "../img/addChat.png";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../context/AuthContext";
import { doc, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

const Search = () => {
    const [search, setSearch] = useState("");
    const { currentUser } = useContext(AuthContext);

    const handleClick = async () => {
        if (search.length > 3) {
            const chatTitleId = uuid();
            const timestamp = serverTimestamp();
            const uid = currentUser.uid;
            const message = 'print("Hello World!")';
            await setDoc(doc(db, "userInfo", uid, "userChats", search), {
                uid,
                chatTitleId,
                chatTitleName: search,
                lastMessage: message,
                executionMessage: message,
                date: timestamp,
            });
            const messageId = uuid();
            await setDoc(
                doc(
                    db,
                    "userInfo",
                    uid,
                    "userChats",
                    search,
                    "chatMessages",
                    messageId
                ),
                {
                    messageId,
                    text: message,
                    sentByUser: true,
                    date: timestamp,
                }
            );
            // await setDoc(doc(db, "userTitle", combinedId), {
            //     uid: currentUser.uid,
            //     chatTitleId,
            //     chatTitleName: search,
            //     date: timestamp,
            // });
            // await setDoc(doc(db, "userChats", combinedId), {
            //     chatTitle: search,
            //     lastMessage: 'print("Hello World!")',
            //     messages: [
            //         {
            //             id: uuid(),
            //             text: 'print("Hello World!")',
            //             sentByUser: true,
            //             date: Timestamp.now(),
            //         },
            //     ],
            // });
        }
        setSearch("");
    };
    return (
        <div className="search">
            <div className="searchForm">
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="search"
                    minLength={4}
                    maxLength={30}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <img src={AddChat} alt="" onClick={handleClick} />
            </div>
            {/* <div className="userChat">
                <img
                    src="https://images.pexels.com/photos/17597045/pexels-photo-17597045/free-photo-of-woman-in-black-leather-jacket-and-scarf.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                    alt=""
                />
                <div className="userChatInfo">
                    <span>Varun</span>
                </div>
            </div> */}
        </div>
    );
};

export default Search;
