import { useRef } from "react";
import "./register.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const password_again = useRef();
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password_again.current.value !== password.current.value) {
      password_again.current.setCustomValidity("Passwords dont match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="registerContainer">
      <div className="registerWrapper">
        <div className="registerLeft">
          <img src="/assets/logoIcons.jpg" alt="" className="registerLogo" />
          <span className="registerDesc">Connect with friends</span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleSubmit}>
            <input
              required
              placeholder="Username"
              className="registerInput"
              ref={username}
            />
            <input
              type="email"
              required
              placeholder="Email"
              className="registerInput"
              ref={email}
            />
            <input
              type="password"
              placeholder="Password"
              className="registerInput"
              minLength="6"
              ref={password}
            />
            <input
              type="password"
              required
              placeholder="Password_Again"
              className="registerInput"
              minLength="6"
              ref={password_again}
            />
            <button className="registerBtn">Sign Up</button>
            <Link to={"/"}>
              <button className="registerRegisterBtn">
                Login into your account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
