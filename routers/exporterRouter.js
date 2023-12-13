import express from 'express'
import {adminAuthentication } from '../middlewares/adminAuth.js';
import {createUser, getMessages, getUser, loginUser, newpassword, recoverPassword, savePrompt, sendVerificationEmail, verifyUser} from '../controllers/userController.js';
import { addExporter, addExporters, getExporter } from '../controllers/exporterController.js';

const ExporterRouter = express.Router();

// get details of the user (requires auth)

ExporterRouter.get("/", getExporter)
// ExporterRouter.use(adminAuthentication)
// add exporter details
ExporterRouter.post("/add", addExporter)
ExporterRouter.post("/addmany", addExporters)
export default ExporterRouter;