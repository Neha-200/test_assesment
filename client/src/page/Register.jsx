import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import {FcGoogle} from "react-icons/fc";
import {Eye, EyeOff} from "lucide-react";

export const Register = () => {
    const [user, setUser] = useState({
        username:"",
        email:"",
        phone:"",
        password:"",
    });

    const [password, setPassword] = useState(false);

    const navigate = useNavigate();

    const {storeTokenInLS} = useAuth();

    const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ... user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch(`http://localhost:5004/api/auth/register`,{
               method:"POST", 
               headers: {'Content-Type':'application/json',},
               body: JSON.stringify(user),
            });

            const res_data = await response.json();
            console.log("res from sever", res_data.extraDetails);

            if (response.ok) {
                
                storeTokenInLS(res_data.token);
                // localStorage.setItem("token",res_data);
                setUser({ username:"", email:"", phone:"", password:"",});
                toast.success('Registration succesful')
                navigate("/");
            }
            else{
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
            // console.log(response);
        } catch (error) {
            console.log("register",error);
        }
    };

    const provider = new GoogleAuthProvider();

    const loginHandler = () => {
        signInWithPopup(auth, provider).then((result) => {
            console.log(user);
            // setUser(result.user);
            setUser({ username:result.user.displayName, email:result.user.email, phone:"", password:"",});
        }).catch((error) => {
            console.log(error);
            toast.error("Sign in Fail");
        })
    }

    const handleClick = () => {
        setPassword(!password);
    }


    return (
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-img">
                            <img src="/img/registrationimg.png" alt="img"
                                width="400" height="400"
                            />
                        </div>
                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Registration From</h1><br/>
                            <form onSubmit={handleSubmit}>
                                <div className="reg">
                                    <label htmlFor="username"><strong>Username:</strong></label>
                                    <input type="text" 
                                    name="username" 
                                    placeholder="username"
                                    required  id="username"
                                    autoComplete="off"
                                    value={user.username}
                                    onChange={handleInput}></input>
                                </div>
                                <div className="reg">
                                    <label htmlFor="email"><strong>Email:</strong></label>
                                    <input type="email" 
                                    name="email" 
                                    placeholder="Enter email"
                                    required id="email"
                                    autoComplete="off"
                                    value={user.email}
                                    onChange={handleInput}></input>
                                </div>
                                <div className="reg">
                                    <label htmlFor="phone"><strong>Phone No:</strong></label>
                                    <input type="number" 
                                    name="phone" 
                                    placeholder="Enter phone no"
                                    required id="phone"
                                    autoComplete="off"
                                    value={user.phone}
                                    onChange={handleInput}></input>
                                </div>
                                <div className="reg" style={{ position: "relative" }}>
                                    <label htmlFor="password"><strong>Password:</strong></label>
                                    <input type= {password ? "text" : "password"}
                                    name="password" className="reg-input"
                                    placeholder="Enter password"
                                    required id="password"
                                    autoComplete="off"
                                    value={user.password}
                                    onChange={handleInput}
                                    style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }}
                                    />
                                    <div onClick={handleClick} style={{ position: "absolute", right: "10px", top: "60px", cursor: "pointer" }}>{password ? <Eye/> : <EyeOff/>}</div>
                                </div>
                                <br/>
                                <div className="reg"><button className="login-btn" onClick={loginHandler}><FcGoogle/> Sing in with Google</button></div>
                                <button type="submit" className="btn btn-submit">Register Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
}