import React, { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { addNewMessage } from "../utils/chatUtils";

const Input = () => {
    const { data } = useContext(ChatContext);
    const [message, setMessage] = useState("");

    const handleSend = async () => {
        const flag = await addNewMessage(data.uid, data.chatTitleId, message);
        console.log(flag);
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
