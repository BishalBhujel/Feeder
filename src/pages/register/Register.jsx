import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router";
import "./register.css";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();

    const handleClick=async(e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            password.current.setCustomValidity("passwords don't match");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password:password.current.value
            }
            try {
                await axios.post("/auth/register", user);
                history.push("/login");
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Feeder</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on Feeder.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            placeholder="Username"
                            required
                            className="loginInput"
                            minLength="6"
                            ref={username}
                        />
                        <input
                            placeholder="Email"
                            className="loginInput"
                            type="email"
                            required
                            ref={email}
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            required
                            className="loginInput"
                            ref={password}
                            minLength="6"
                        />
                        <input
                            placeholder="Re-type your Password"
                            className="loginInput"
                            type="password"
                            required
                            ref={passwordAgain}
                            minLength="6"
                        />
                        <button className="loginButton" type="submit">Sign Up</button>
                        <button className="loginRegisterButton">
                            Log into Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}