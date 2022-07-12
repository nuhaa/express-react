import express from "express";
import { getAuth, register } from "../controller/AuthController.js";
const router = express.Router();

router.post('/api/login', getAuth);
router.post('/api/register', register);

export default router;