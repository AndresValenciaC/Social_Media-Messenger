import { useRef, useContext } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls.js";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <div className="loginLeft">
          <img src="/assets/logoIcons.jpg" alt="" className="loginLogo" />
          <span className="loginDesc">Connect with friends</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onClick={handleSubmit}>
            <input
              required
              type="email"
              placeholder="Email"
              className="loginInput"
              ref={email}
            />
            <input
              required
              type="password"
              placeholder="Password"
              className="loginInput"
              minLength="6"
              ref={password}
            />
            <button className="loginBtn" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="40px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot" type="submit">
              Forgot Password ?
            </span>
            <Link to={"/register"}>
              {" "}
              <button className="loginRegisterBtn">
                {isFetching ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Create a New Account"
                )}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
