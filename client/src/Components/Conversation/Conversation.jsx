import { useState, useEffect } from "react";
import axios from "axios";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setFriends(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation.members]);

  return (
    <div className="conversationContainer">
      <img
        src={
          friends.profilePicture
            ? friends.profilePicture
            : "/assets/userPic.png"
        }
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{friends.username}</span>
    </div>
  );
}
