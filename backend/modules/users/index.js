const { Router } = require("express");
const {  browse, register, login, logout, edit, deleteUserOne } = require("./controller");

const { authorization, isAdmin } = require("./validator");

const router = Router();

router.get("/", authorization, isAdmin, browse);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", authorization, logout);
router.put('/:id', authorization, edit);
router.delete('/:id', deleteUserOne);

module.exports = router;