import express  from 'express'
import {getAllApplications,filterApplications,addTokenNumber,} from "../controllers/adminPanel.controllers.js";

const router = express.Router();

router.get("/applications", getAllApplications);
router.get("/applications/filter", filterApplications);
router.post("/applications/add-token", addTokenNumber);

export default router;
