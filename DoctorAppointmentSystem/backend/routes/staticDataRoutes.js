import express from "express";
import getStaticDataController from '../controllers/staticDataController'

const router = express.Router();

//routes
router.get("/staticData", getStaticDataController);