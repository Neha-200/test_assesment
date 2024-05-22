import { toast } from 'react-toastify';
import { useAuth } from "../store/auth";

export const Home = () => {

    const { user } = useAuth();

    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    

    const submitHandler = async () => {
        
        const userId = user._id;
    
        const originalUrl = document.getElementById('originalUrl').value;
        if (!originalUrl || !isValidUrl(originalUrl)) {
            toast.warn('Please enter a valid URL');
            return;
        }
        try {
            const response = await fetch('http://localhost:5004/api/url/shorten', {
                method : "POST",
                headers : {'Content-Type' : 'application/json',},
                body: JSON.stringify({userId, originalUrl}),
            });
            const data = await response.json();
            document.getElementById('result').textContent = `Shortened URL : http://localhost:5004/api/url/${data.shortUrl}`;
             

        } catch (error) {
            console.error('Error shortening the URL : ', error);
            toast.error("Error shortening the URL, PLEASE TRY AGAIN");
        }
    }

    return (
        
        <main>
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-content">
                      
                       <h1>URL SHORTENER</h1>
                       <p>Short your lengthy URLs ....</p>
                       <input type='url' id='originalUrl' placeholder='Enter your long URL'/> <br/>
                       <button id='shortenBtn' onClick={submitHandler}>Shorten</button>
                       <div id='result'></div>
                    </div>  
                       <div className="hero-img">
                          <img src="/img/url.png" width="450" height="430" alt="img"/>
                        </div>
                    
                </div>
            </section>
        </main>
        
    );
}