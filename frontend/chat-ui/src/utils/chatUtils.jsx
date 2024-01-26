import {
    doc,
    serverTimestamp,
    setDoc,
    arrayUnion,
    updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";

const DEFAULT_CHAT_TITLE = "Untitled";
const DEFAULT_CHAT_MSG = 'print("Hello World!")';

export const createChat = async (
    uid,
    chatTitleId = uuid(),
    chatTitleName = DEFAULT_CHAT_TITLE,
    lastMessage = DEFAULT_CHAT_MSG,
    lastMessageByUser = true,
    executionMessage = DEFAULT_CHAT_MSG
) => {
    try {
        await setDoc(doc(db, "userInfo", uid, "userChats", chatTitleId), {
            uid,
            chatTitleId,
            chatTitleName,
            lastMessage,
            lastMessageByUser,
            executionMessages: [executionMessage],
            isActive: true,
            date: serverTimestamp(),
        });
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const createChatMessage = async (
    uid,
    chatTitleId = uuid(),
    message = DEFAULT_CHAT_MSG,
    sentByUser = true
) => {
    const messageId = uuid();
    try {
        await setDoc(
            doc(
                db,
                "userInfo",
                uid,
                "userChats",
                chatTitleId,
                "chatMessages",
                messageId
            ),
            {
                messageId,
                text: message,
                sentByUser,
                isActive: true,
                date: serverTimestamp(),
            }
        );
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const createChatAndChatMsg = async (
    uid,
    chatTitleId = uuid(),
    chatTitleName = DEFAULT_CHAT_TITLE,
    message = DEFAULT_CHAT_MSG,
    sentByUser = true,
    executionMessage = DEFAULT_CHAT_MSG
) => {
    const flag1 = await createChat(
        uid,
        chatTitleId,
        chatTitleName,
        message,
        sentByUser,
        executionMessage
    );
    const flag2 = await createChatMessage(
        uid,
        chatTitleId,
        message,
        sentByUser
    );
    return flag1 && flag2;
};

export const updateChatLastMessage = async (uid, chatTitleId, message) => {
    try {
        await updateDoc(doc(db, "userInfo", uid, "userChats", chatTitleId), {
            lastMessage: message,
            lastMessageByUser: true,
            executionMessages: arrayUnion(message),
            date: serverTimestamp(),
        });
        return true;
    } catch (err) {
        console.log(err.message);
        return false;
    }
};

export const addNewMessage = async (uid, chatTitleId, message) => {
    const flag1 = await createChatMessage(uid, chatTitleId, message, true);
    const flag2 = await updateChatLastMessage(uid, chatTitleId, message);
    return flag1 && flag2;
};
