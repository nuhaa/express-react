import express from "express";
import { getPassword } from "../controller/TesterController.js";
const router = express.Router();

router.post('/create-bcypt-password', getPassword);

export default router;