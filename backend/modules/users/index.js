const { Router } = require("express");
const { browse, register, login, logout, edit, deleteUserOne, sendResetPassword, resetPassword } = require("./controller");

const { authorization, isAdmin } = require("./validator");

const router = Router();

router.get("/", authorization, isAdmin, browse);
router.post("/register", register);
router.post("/login", login);
router.post("/sendResetPassword", sendResetPassword);
router.post("/resetPassword", resetPassword);
router.get("/logout", authorization, logout);
router.put('/:id', authorization, edit);
router.delete('/:id', deleteUserOne);

module.exports = router;