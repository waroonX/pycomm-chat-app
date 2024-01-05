import React, { useContext, useState } from "react";
import AddChat from "../img/addChat.png";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../context/AuthContext";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Search = () => {
    const [search, setSearch] = useState("");
    const { currentUser } = useContext(AuthContext);

    const handleClick = async () => {
        if (search.length > 3) {
            const chatTitleId = uuid();
            const combinedId = currentUser.uid + chatTitleId;
            await setDoc(doc(db, "userTitle", combinedId), {
                uid: currentUser.uid,
                chatTitleId,
                chatTitleName: search,
                date: serverTimestamp(),
            });
            await setDoc(doc(db, "userChats", combinedId), {
                messages: [
                    {
                        id: uuid(),
                        text: 'print("Hello World!")',
                        sentByUser: true,
                        date: serverTimestamp(),
                    },
                ],
            });
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
            <div className="userChat">
                <img
                    src="https://images.pexels.com/photos/17597045/pexels-photo-17597045/free-photo-of-woman-in-black-leather-jacket-and-scarf.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                    alt=""
                />
                <div className="userChatInfo">
                    <span>Varun</span>
                </div>
            </div>
        </div>
    );
};

export default Search;
