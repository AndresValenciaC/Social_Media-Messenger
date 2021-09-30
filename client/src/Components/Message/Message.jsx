import React from "react";
import "./message.css";
import { format } from "timeago.js";
export default function Message({ own, messages }) {
  return (
    <div className={own ? "messageContainer " : "messageContainer own"}>
      <div className="messageTop">
        <p className="messageTopTxt">{messages.text}</p>
      </div>
      <div className="messageBottom">{format(messages.createdAt)}</div>
    </div>
  );
}
