import React from "react";

const Navbar = () => {
    return (
        <div className="navbar">
            <span className="logo">Pycomm Command Chat</span>
            <div className="user">
                <img
                    src="https://images.pexels.com/photos/17597045/pexels-photo-17597045/free-photo-of-woman-in-black-leather-jacket-and-scarf.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                    alt=""
                />
                <span>Varun</span>
                <button>logout</button>
            </div>
        </div>
    );
};

export default Navbar;
