import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatContent from "../components/Chat/Chat_content";

function Chat() {
    return (
        <div className="chat">
            <div className="container">
                <ChatContent></ChatContent>
            </div>
        </div>
    );
}

export default Chat;