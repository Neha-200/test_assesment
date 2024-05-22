// const crypto = require('crypto');

//     const generateShortUrl = () => {
//         return crypto.randomBytes(6).toString('hex');
//     }


// module.exports = {generateShortUrl};



const generateShortUrl = (url) => {
    let hash = 5381;
    for (let i = 0; i < url.length; i++) {
        hash = ((hash << 5) + hash) + url.charCodeAt(i); // hash * 33 + c
    }
    
    // Convert to a positive integer
    hash = hash >>> 0;
    
    // Convert to base-36 for shorter output and slice to ensure length
    let base36Hash = hash.toString(36);

    // Adjust length to be between 10 and 20 characters
    if (base36Hash.length < 10) {
        base36Hash = base36Hash.padStart(10, '0'); // Pad with leading zeros if too short
    } else if (base36Hash.length > 20) {
        base36Hash = base36Hash.slice(0, 20); // Truncate if too long
    }

    console.log(base36Hash);
    return base36Hash;
}


module.exports = {generateShortUrl};