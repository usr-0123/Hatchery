import { Router } from "express";
import { verifyTokenMiddleware } from "../middlewares/authMiddlewares.js";
import { createNewIncubationController, fetchIncubationController, fetchIncubationsController, updateincubationController } from "../controllers/incubationControllers.js";
import { deleteHatchRecordController } from "../controllers/hatchRecordsControllers.js";

const incubationRoutes = Router();

incubationRoutes.post('/incubation/add', verifyTokenMiddleware, createNewIncubationController )
incubationRoutes.get('/incubation/fetch/ all', verifyTokenMiddleware, fetchIncubationsController)
incubationRoutes.get('/incubation/fetch/incubationId/:incubationId', verifyTokenMiddleware, fetchIncubationController)
incubationRoutes.get('/incubation/fetch/batchId/:batchId', verifyTokenMiddleware, fetchIncubationController)
incubationRoutes.get('/incubation/fetch/startDate/:startDate', verifyTokenMiddleware, fetchIncubationController)
incubationRoutes.get('/incubation/fetch/hatchDate/:hatchDate', verifyTokenMiddleware, fetchIncubationController)
incubationRoutes.get('/incubation/fetch/incubationState/:IncubationState', verifyTokenMiddleware, fetchIncubationController)
incubationRoutes.patch('/incubation/update/:incubationId', verifyTokenMiddleware, updateincubationController)
incubationRoutes.delete('/incubation/delete/:incubationId', verifyTokenMiddleware, deleteHatchRecordController)

export default incubationRoutes;