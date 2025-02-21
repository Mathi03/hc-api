import express from "express";
import AuthController from "../controllers/AuthController";
import rateLimit from 'express-rate-limit';

const router = express.Router();

const nonAuthLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // Limit each IP to 30 requests per min
    message: 'Too many requests from this IP',
});

router.post('/v1/sign-in', nonAuthLimiter, AuthController.login);
router.post('/v1/signup', nonAuthLimiter, AuthController.register);

export default router;
