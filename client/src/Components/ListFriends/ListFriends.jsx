import { useState, useEffect, useContext } from "react";
import "./listFriends.css";
//import { Users } from "../../dummyData";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
export default function ListFriends() {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(`users/friends/${user._id}`);
        setFriends(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  });

  return (
    <div className="containerFriendList">
      {friends.map((f) => (
        <ul className="sideBarFriendList">
          <li className="sideBarFriend">
            <img src={f.profilePicture} alt="" className="sideBarFriendImg" />
            <span className="sideBarFriendTxt">{f.username}</span>
          </li>
        </ul>
      ))}
    </div>
  );
}
