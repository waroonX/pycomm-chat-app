import React, { useEffect, useRef } from "react";

const Message = ({ msgInfo }) => {
    const classType = msgInfo.sentByUser ? "message owner" : "message";
    const timestamp = msgInfo.date?.toDate().toLocaleString();
    const ref = useRef();
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [msgInfo]);
    return (
        <div ref={ref} className={classType}>
            <div className="messageInfo">
                <img
                    src="https://images.pexels.com/photos/792326/pexels-photo-792326.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt=""
                />
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>{msgInfo.text}</p>
            </div>
        </div>
    );
};

export default Message;
