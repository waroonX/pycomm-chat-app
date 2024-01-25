import React from "react";

const Message = ({ msgInfo }) => {
    const classType = msgInfo.sentByUser ? "message owner" : "message";
    const timestamp = msgInfo.date?.toDate().toLocaleString();
    // console.log(msgInfo.date.toDate().toLocaleString());
    // console.log(new Date(msgInfo.date.nanoseconds).toLocaleString());
    return (
        <div className={classType}>
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
