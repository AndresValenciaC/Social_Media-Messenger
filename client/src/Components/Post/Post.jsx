import { MoreVert } from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import "./post.css";
import { AuthContext } from "../../context/AuthContext";
//import { Users } from "../../dummyData";
export default function Post({ post }) {
  /** work with env variables
   * const PF = process.env.REACT_APP_PUBLIC_FOLDER-
   */
  const [user, setUser] = useState([]);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, isSetLiked] = useState(false);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    isSetLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (error) {
      console.log(error);
    }

    setLike(isLiked ? like - 1 : like + 1);
    isSetLiked(!isLiked);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);

      setUser(res.data);
    };
    fetchUsers();
  }, [post.userId]);
  return (
    <div className="postContainer">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                src={user.profilePicture || "/assets/userPic.png"}
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUserName">{user.username}</span>
            <span className="postDate"> {format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postTxt">{post.description}</span>
          <img src={post.image} alt="" className="postCenterImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="LikeIcon"
              onClick={likeHandler}
              src="/assets/like.png"
              alt=""
            />
            <img
              className="LikeIcon"
              onClick={likeHandler}
              src="/assets/heart.png"
              alt=""
            />
            <span className="likeCounter">{like} people like post</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentTxt">{post.comment}comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
