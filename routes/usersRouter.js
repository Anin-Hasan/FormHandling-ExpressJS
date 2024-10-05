const { Router } = require("express");
const usersController = require("../controllers/userController");
const usersRouter = Router();

usersRouter.get("/", usersController.userListGet);
usersRouter.get("/create", usersController.createUserGet);
usersRouter.post("/create", usersController.userCreatePost);
usersRouter.get("/:id/update", usersController.usersUpdateGet);
usersRouter.post("/:id/update", usersController.usersUpdatePost);
usersRouter.post("/:id/delete", usersController.usersDeletePost);
usersRouter.get("/search", usersController.searchUserGet);
module.exports = usersRouter;
