import { useState, useEffect } from "react";
import "./chatOnline.css";
import axios from "axios";
export default function ChatOnline({
  onlineUsers,
  currentUser,
  setCurrentChat,
}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentUser);
      setFriends(res.data);
    };
    getFriends();
  }, [currentUser]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers?.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (onlineUser) => {
    try {
      const res = await axios.get(
        `/conversation/find/${currentUser}/${onlineUser} `
      );
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatOnlineContainer">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              src={o?.profilePicture ? o.profilePicture : "assets/userPic.png"}
              alt=""
              className="chatOnlineImg"
            />
            <div className="onlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o.username}</span>
        </div>
      ))}
    </div>
  );
}
