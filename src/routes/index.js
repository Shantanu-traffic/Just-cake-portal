// Requiring module
import app from "express";
import IndexControllerObj from "../controllers";

// Initiate router
const router = app.Router();

router.get("/", IndexControllerObj.serverHealth());

export default router;
