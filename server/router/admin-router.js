const express = require("express");
const adminController = require("../controllers/admin-controllers");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

const router = express.Router();

router.route('/users').get(authMiddleware, adminMiddleware ,adminController.getAllUsers);

router.route('/users/:id').get(authMiddleware, adminMiddleware, adminController.getUserByID);

router.route('/users/update/:id').patch(authMiddleware, adminMiddleware, adminController.updateUserByID);

router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteUserById);


module.exports = router;