import React from "react";

const Message = () => {
    return (
        <div className="message owner">
            <div className="messageInfo">
                <img
                    src="https://images.pexels.com/photos/792326/pexels-photo-792326.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt=""
                />
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>Hello World!</p>
            </div>
        </div>
    );
};

export default Message;
