import React from "react";
import AddChat from "../img/addChat.png";

const Search = () => {
    return (
        <div className="search">
            <div className="searchForm">
                <input type="text" name="" id="" placeholder="search" />
                <img src={AddChat} alt="" />
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
