const express = require("express");
const urlController = require("../controllers/url-controllers");

const router = express.Router();

router.post('/shorten', urlController.shortenUrl);
router.get('/:shortUrl', urlController.redirectToOriginalUrl);
router.post('/getUserUrl', urlController.userUrl);

module.exports = router;