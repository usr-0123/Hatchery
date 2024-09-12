import { Router } from "express";
import { verifyTokenMiddleware } from "../middlewares/authMiddlewares.js";
import { createNewHatchRecordController, deleteHatchRecordController, fetchHatchRecordController, fetchHatchRecordsController, updateHatchController } from "../controllers/hatchRecordsControllers.js";

const hatchRecordRoutes = Router();

hatchRecordRoutes.post('/hatchRecord/add', verifyTokenMiddleware, createNewHatchRecordController )
hatchRecordRoutes.get('/hatchRecord/fetch/all', verifyTokenMiddleware, fetchHatchRecordsController)
hatchRecordRoutes.get('/hatchRecord/fetch/hatchRecordId/:hatchRecordId', verifyTokenMiddleware, fetchHatchRecordController)
hatchRecordRoutes.get('/hatchRecord/fetch/batchId/:batchId', verifyTokenMiddleware, fetchHatchRecordController)
hatchRecordRoutes.get('/hatchRecord/fetch/dateHatched/:dateHatched', verifyTokenMiddleware, fetchHatchRecordController)
hatchRecordRoutes.patch('/hatcheRecord/update/:editorId/:hatchRecordId', verifyTokenMiddleware, updateHatchController)
hatchRecordRoutes.delete('/hatchRecord/delete/:editorId/:hatchRecordId', verifyTokenMiddleware, deleteHatchRecordController)

export default hatchRecordRoutes;