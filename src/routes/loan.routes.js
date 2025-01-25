import express from 'express';
import { applyLoan } from '../controllers/loan.controllers.js';

const router = express.Router();

router.post('/applyLoan', applyLoan);

export default router;
