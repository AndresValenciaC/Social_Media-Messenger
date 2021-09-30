import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./rightSideBar.css";
import OnlineFriends from "../OnlineFriends/OnlineFriends";
import axios from "axios";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";

//import { Users } from "../../dummyData";
export default function RightSideBar({ user }) {
  /** Login that shows rightsideBar in home but not in profile */
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);

        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user]);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [user, currentUser.followings]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };
  const HomeRightSideBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="/assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayTxt">
            <b>Paola Foster</b> and <b> 3 others</b> have a birthday today
          </span>
        </div>
        <img src="/assets/ad.png" alt="" className="adImg" />
      </>
    );
  };

  const ProfileRightSideBar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightBarFollowBtn" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightBarTitle">User information</h4>
        <div className="rightBarInfo">
          <span className="rightBarInfoKey">City:</span>
          <span className="rightBarInfoValue">{user.city}</span>
        </div>
        <div className="rightBarInfo">
          <span className="rightBarInfoKey">From:</span>
          <span className="rightBarInfoValue">{user.from}</span>
        </div>
        <div className="rightBarInfo">
          <span className="rightBarInfoKey">Relationship:</span>
          <span className="rightBarInfoValue">
            {user.relationship === 1
              ? "Single"
              : user.relationship === 2
              ? "Married"
              : ""}
          </span>
        </div>
        <h4 className="rightBarTitle">Friends</h4>
        <div className="rightBarFollowings">
          {friends.map((friend) => (
            <div className="rightBarFollowingsItem">
              <Link
                to={`/profile/${friend.username}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={
                    friend.profilePicture
                      ? friend.profilePicture
                      : "assets/userPic.png"
                  }
                  alt=""
                  className="rightBarFollowingsImg"
                />
              </Link>
              <span className="rightBarFollowingsName">{friend.username}</span>
            </div>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightSidebarContainer">
      <div className="birthdayWrapper">
        {user ? <ProfileRightSideBar /> : <HomeRightSideBar />}
      </div>
    </div>
  );
}
