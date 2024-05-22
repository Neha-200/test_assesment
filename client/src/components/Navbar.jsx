import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";

export const Navbar = () => {
    
    const {isLoggedIn} = useAuth();

    return (
        <>
            <header className="">
                <div className="container-header">
                    <div className="logo-brand">
                        <a href="/">tinyUrl</a>
                    </div>
                    <nav className="header-nav">
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            { isLoggedIn ? (
                                <>
                                <li><NavLink to="/user">User</NavLink></li>
                                <li><NavLink to="/logout">Logout</NavLink></li> 
                                </>)
                            : (<>
                                
                                <li><NavLink to="/register">Register</NavLink></li>
                                <li><NavLink to="/login">Login</NavLink></li>
                            </>)}
                            
                            
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
};