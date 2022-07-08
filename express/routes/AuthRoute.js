import express from "express";
import { getAuth } from "../controller/AuthController.js";
const router = express.Router();

router.post('/api/login', getAuth);

export default router;