import { Router } from "express";

const router = Router();

import authController from "../controllers/authController";

router.post("/signup", authController.register);
router.post("/signin", authController.login);

export default router;
