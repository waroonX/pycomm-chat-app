import React, { useState } from "react";

const Login = () => {
    const [err, setErr] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">PyComm Command Chat</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input required type="email" placeholder="email" />
                    <input required type="password" placeholder="password" />
                    <button disabled={false}>Login</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>Don't have an account? Sign Up</p>
            </div>
        </div>
    );
};

export default Login;
