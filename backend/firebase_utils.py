from firebase import get_firebase_client
from firebase_admin.firestore import SERVER_TIMESTAMP
from uuid import uuid4 as uuid

firestore_client = get_firebase_client()

def test_doc_creation() -> None:
    doc_ref = firestore_client.collection("laptops").document("1")
    doc_ref.set(
        {
            "name": "HP EliteBook Model 1",
            "brand": "HP",
        }
    )
    
def get_chat_exec_msgs(uid: str, chat_title_id: str):
    doc_ref = firestore_client.collection("userInfo").document(uid).collection("userChats").document(chat_title_id)
    doc = doc_ref.get()
    if doc.exists:
        try:
            doc = doc.to_dict()
            if doc["lastMessageByUser"]:
                return doc["executionMessages"]
        except:
            return None
    return None

def create_new_msg(uid: str, chat_title_id: str, message: str, sentByUser: bool = False):
    msg_id = str(uuid())
    msg_ref = firestore_client.collection("userInfo").document(uid).collection("userChats").document(chat_title_id).collection("chatMessages").document(msg_id)
    msg_ref.set({
        "messageId": msg_id,
        "text": message,
        "sentByUser": sentByUser,
        "isActive": True,
        "date": SERVER_TIMESTAMP
    })
    
def update_chat_info(uid: str, chat_title_id: str, message: str, sentByUser: bool = False):
    chat_ref = firestore_client.collection("userInfo").document(uid).collection("userChats").document(chat_title_id)
    chat_ref.update({
        "lastMessage": message,
        "lastMessageByUser": sentByUser,
        "date": SERVER_TIMESTAMP
    })
    
def limit_output_chars(cmd_output, max_chars = 25):
    temp_output = cmd_output.split("\n")[0]
    temp_output = temp_output[:max_chars] if len(cmd_output)<=max_chars else temp_output[:max_chars] + "..."
    return temp_output

def send_compiled_output(uid: str, chat_title_id: str, cmd_output: str):
    create_new_msg(uid, chat_title_id, cmd_output)
    cmd_output = limit_output_chars(cmd_output)
    update_chat_info(uid, chat_title_id, cmd_output)
    
def main():
    print(create_new_msg("xFJxMXnhwFSWlF9RCMukcOeM0w23", "05a9ecff-93e0-404a-830e-980fe2733e47", "response from server"))

if __name__ == "__main__":
    main()