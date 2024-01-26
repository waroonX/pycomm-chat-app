import React, { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { addNewMessage, clearChatExecMessages } from "../utils/chatUtils";

const Input = () => {
    const { data } = useContext(ChatContext);
    const [message, setMessage] = useState("");

    const handleSend = async () => {
        let flag = false;
        if (message === "clear") {
            flag = await addNewMessage(data.uid, data.chatTitleId, message);
            flag = await clearChatExecMessages(
                data.uid,
                data.chatTitleId,
                message
            );
        } else {
            flag = await addNewMessage(data.uid, data.chatTitleId, message);
        }
    };
    return (
        <div className="input">
            <input
                type="text"
                name=""
                id=""
                placeholder="enter command..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <div className="send">
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Input;
