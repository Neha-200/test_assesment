import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    // const [url, setUrl] = useState("");
    const authorizationToken = `Bearer ${token}`;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem('token', serverToken);
    };

    let isLoggedIn = !!token;

    const logoutUser = () => {
        setToken("");
        user._id = null;
        return localStorage.removeItem("token");
    };
    
    const userAuthentication = async () => {
       try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5004/api/auth/user", {
            method: "GET",
            headers: {
                Authorization: authorizationToken,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('user data',data.userData);
            setUser(data.userData);
            setIsLoading(false);
        } else {
            console.error("Error fetching user data");
            setIsLoading(false);
        }
       } catch (error) {
        console.log("Error fetching user data ");
       }
    }


    //fetch the services data from database
    const getServices = async () => {
        try {
            const response = await fetch("http://localhost:5004/api/data/service",
            {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.msg);
                setServices(data.msg);
            }
        } catch (error) {
            console.log(`services frontend error: ${error}`);
        }
    }

    useEffect(() => {
        getServices();
        userAuthentication()
    }, [])


    return <AuthContext.Provider value={{isLoggedIn, storeTokenInLS, logoutUser, user, services, authorizationToken, isLoading}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
}
