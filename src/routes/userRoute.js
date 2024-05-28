import { Router } from "express";

const router = Router();

import userController from "../controllers/userController.js";

router.get("/profile", userController.getUserProfile);
router.get("/", userController.getAllUsers);

export default router;
