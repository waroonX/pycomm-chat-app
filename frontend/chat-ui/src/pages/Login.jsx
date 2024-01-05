import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [err, setErr] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr();

        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            const errorMessage = err.message;
            setErr(errorMessage);
        }
    };
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">PyComm Command Chat</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input required type="email" placeholder="email" />
                    <input required type="password" placeholder="password" />
                    <button>Login</button>
                    {err && <span className="formError">{err}</span>}
                </form>
                <p>
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
