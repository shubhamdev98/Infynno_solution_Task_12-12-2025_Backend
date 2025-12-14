import { Router } from "express";
import { UserController } from "../modules/user/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { registerSchema, loginSchema } from "../validators/user.validator";

const router = Router();

router.post("/register", validate(registerSchema), UserController.register);
router.post("/login", validate(loginSchema), UserController.login);
router.get("/refresh", UserController.refresh);
router.get("/profile", authMiddleware, UserController.profile);
router.post("/logout", authMiddleware, UserController.logout);

export default router;
