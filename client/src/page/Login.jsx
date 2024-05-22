import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import {Eye, EyeOff} from "lucide-react";


export const Login = () => {

    const [user,setUser] = useState({
        email: "",
        password: ""
    });

    const [password, setPassword] = useState(false);

    const navigate = useNavigate();

    const {storeTokenInLS} = useAuth();

    const handleInput = (e) => {
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
            const response = await fetch(`http://localhost:5004/api/auth/login`,{
                method:"POST",
                headers: {"Content-type":"application/json",},
                body: JSON.stringify(user),
            });
 
            console.log("login",response);

            const res_data = await response.json();

            if (response.ok) {
                toast.success("Login successful");
                storeTokenInLS(res_data.token);
                // localStorage.setItem("token",res_data.token);
                setUser({ email:"", password:"",});
                navigate("/");
            }else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
                console.log();
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = () => {
        setPassword(!password);
    }

    return (
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="login-img">
                            <img src="/img/loginimg.png" alt="img"
                                width="470" height="470"
                            />
                        </div>
                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Login From</h1><br/>
                            <form onSubmit={handleSubmit}>
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
                                <div className="reg" style={{ position: "relative" }}>
                                    <label htmlFor="password"><strong>Password:</strong></label>
                                    <input type= {password ? "text" : "password"}
                                    name="password" 
                                    placeholder="Enter password"
                                    required id="password"
                                    autoComplete="off"
                                    value={user.password}
                                    onChange={handleInput}
                                    style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }}/>
                                    <div onClick={handleClick} style={{ position: "absolute", right: "10px", top: "60px", cursor: "pointer" }}>{password ? <Eye/> : <EyeOff/>}</div>

                                </div>
                                <br/>
                                <button type="submit" className="btn btn-submit">Login Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
}