import { Router } from "express";

const router = Router();

import authController from "../controllers/authController.js";

router.post("/signup", authController.register);
router.post("/signin", authController.login);

export default router;
