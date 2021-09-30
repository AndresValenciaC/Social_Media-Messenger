import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import axios from "axios";
export default function Share() {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      description: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = "public/fileStorageImg/" + Date.now() + file.name;
      data.append("name", fileName); // the file path
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      console.log(data);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload(); // to reload the vista
    } catch (err) {}
  };
  return (
    <div className="shareContainer">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture ? user.profilePicture : "/assets/userPic.png"
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            placeholder={"What is in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImageContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" />
              <span className="shareOptionTxt">Photo or video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg , jpg"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" />
              <span className="shareOptionTxt">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" />
              <span className="shareOptionTxt">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" />
              <span className="shareOptionTxt">Feelings</span>
            </div>
          </div>
          <button type="submit" className="shareBtn">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
