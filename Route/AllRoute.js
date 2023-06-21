import express from "express";
import { autoComplete, calendar, register, searchByLocation } from "../Controller/userController.js";

const router = express.Router();

router.post('/register', register);
router.get('/search-location', searchByLocation);
router.get('/calendar', calendar);
router.get('/auto-complete', autoComplete);

export default router;