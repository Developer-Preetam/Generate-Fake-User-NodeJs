import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getUsers, generateUsers, exportUsersCsv } from '../controllers/userController.js';

const router = express.Router();

router.get("/get-user", verifyToken, getUsers);
router.post("/generate-user", verifyToken, generateUsers);
router.get("/export/csv", verifyToken, exportUsersCsv);

export { router as userRoutes }