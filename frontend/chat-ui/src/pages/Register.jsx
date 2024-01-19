import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase.jsx";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { arrayUnion, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { createChatAndChatMsg } from "../utils/chatUtils.jsx";

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

            // console.log(email);
            // console.log(password);

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
                        const flag = await createChatAndChatMsg(res.user.uid);
                        console.log(flag);
                        // const chatTitleId = uuid();
                        // const timestamp = serverTimestamp();
                        // const uid = res.user.uid;
                        // const message = 'print("Hello World!")';
                        // const chatTitleName = "Untitled";
                        // await setDoc(
                        //     doc(
                        //         db,
                        //         "userInfo",
                        //         uid,
                        //         "userChats",
                        //         chatTitleName
                        //     ),
                        //     {
                        //         uid,
                        //         chatTitleId,
                        //         chatTitleName,
                        //         lastMessage: message,
                        //         executionMessage: message,
                        //         date: timestamp,
                        //     }
                        // );
                        // const messageId = uuid();
                        // await setDoc(
                        //     doc(
                        //         db,
                        //         "userInfo",
                        //         uid,
                        //         "userChats",
                        //         chatTitleName,
                        //         "chatMessages",
                        //         messageId
                        //     ),
                        //     {
                        //         messageId,
                        //         text: message,
                        //         sentByUser: true,
                        //         date: timestamp,
                        //     }
                        // );
                        // await setDoc(doc(db, "userTitle", combinedId), {
                        //     uid: res.user.uid,
                        //     chatTitleId,
                        //     chatTitleName: "Untitled",
                        //     date: serverTimestamp(),
                        // });
                        // await setDoc(doc(db, "userChats", combinedId), {
                        //     messages: [
                        //         {
                        //             id: uuid(),
                        //             text: 'print("Hello World!")',
                        //             sentByUser: true,
                        //             date: serverTimestamp(),
                        //         },
                        //     ],
                        // });

                        //navigate to homepage
                        navigate("/");
                    } catch (err) {
                        console.log(err);
                    }
                });
            });
        } catch (err) {
            const errorMessage = err.message;
            console.log(err);
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
                    <button>Sign up</button>
                    {err && <span className="formError">{err}</span>}
                </form>
                <p>
                    Do you have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
