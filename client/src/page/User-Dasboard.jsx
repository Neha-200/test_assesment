
import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const UserDashboard = () => {
    const [urls, setUrls] = useState([]);
    const { user } = useAuth();
    const userId = user._id;

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:5004/api/url/getUserUrl', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ userId })
            });

            const data = await response.json();

            if (data.status === true) {
                // Extract the array of URLs from the response and set it as state
                setUrls(data.success);
            } else {
                console.error("Server returned error:", data);
                setUrls([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setUrls([]);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    return (
        <section className="user-dashboard">
            <div>
                <h2>Welcome, {user && user.username} here are your shorten Urls...</h2>
            </div>
            <div>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>OriginalUrl</th>
                            <th>ShortUrl</th>
                            <th>Clicks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {urls.map((curUrl, index) => (
                            <tr key={index}>
                                <td className="long-url">{curUrl.originalUrl}</td>
                                <td>
                                    <a href={`http://localhost:5004/api/url/${curUrl.shortUrl}`} target="_blank" rel="noopener noreferrer">
                                        {curUrl.shortUrl}
                                    </a>
                                </td>
                                <td>{curUrl.clicks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};