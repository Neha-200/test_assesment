
const Url = require("../models/url-model");
const UrlShortener = require("../utils/url-shortener");

const shortenUrl = async (req, res) => {
    const { userId, originalUrl } = req.body;

    try {
        if (!originalUrl) {
            return res.status(400).json({ message: "URL is required" });
        }

        // Generate short URL
        const shortUrl = UrlShortener.generateShortUrl(originalUrl);
        console.log(shortUrl);

        // Check if short URL already exists in the database
        let url = await Url.findOne({ shortUrl });

        if (url) {
            // If URL exists, update the userId if it's different
            if (url.userId !== userId) {
                url.userId = userId;
                await url.save();
            }
        } else {
            // If URL does not exist, create a new record
            url = new Url({ userId, originalUrl, shortUrl });
            await url.save();
        }

        res.json(url);

    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

const redirectToOriginalUrl = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const url = await Url.findOne({ shortUrl });

        if (!url) {
            return res.status(404).send("URL NOT FOUND");
        }

        url.clicks += 1;
        await url.save();
        return res.redirect(url.originalUrl);

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

const userUrl = async (req, res) => {
    try {
        const { userId } = req.body;
        const allUserUrl = await Url.find({ userId });

        if (allUserUrl.length > 0) {
            res.json({ status: true, success: allUserUrl });
        } else {
            res.json({ status: false, message: "No data found" });
        }

    } catch (error) {
        console.error(`Error from the user route: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { shortenUrl, redirectToOriginalUrl, userUrl };