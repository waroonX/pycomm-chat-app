import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase.jsx";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
    const [err, setErr] = useState();
    const [fileName, setFileName] = useState("Add an avatar");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr();

        const fullName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `user_photos/${fullName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName: fullName,
                            photoURL: downloadURL,
                        });

                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName: fullName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create initial userchat
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/login");
                    } catch (err) {
                        console.log(err);
                    }
                });
            });
        } catch (err) {
            const errorMessage = err.message;
            setErr(errorMessage);
        }
    };

    const handleFileChange = (e) => {
        setFileName(e.target.files[0].name);
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">PyComm Command Chat</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input required type="text" placeholder="full name" />
                    <input required type="email" placeholder="email" />
                    <input required type="password" placeholder="password" />
                    <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span>{fileName}</span>
                    </label>
                    <button disabled={false}>Sign up</button>
                    {err && <span className="formError">{err}</span>}
                </form>
                <p>Do you have an account? Login</p>
            </div>
        </div>
    );
};

export default Register;
