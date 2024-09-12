import { Router } from "express";
import { verifyTokenMiddleware } from "../middlewares/authMiddlewares.js";
import { createNewIncubationController, deleteIncubationController, fetchIncubationController, fetchIncubationsController, updateincubationController } from "../controllers/incubationControllers.js";

const incubationRoutes = Router();

incubationRoutes.post('/incubation/add', verifyTokenMiddleware, createNewIncubationController )
incubationRoutes.get('/incubation/fetch/all', verifyTokenMiddleware, fetchIncubationsController)
incubationRoutes.get('/incubation/fetch/incubationId/:incubationId', verifyTokenMiddleware, fetchIncubationController)
incubationRoutes.get('/incubation/fetch/batchId/:batchId', verifyTokenMiddleware, fetchIncubationController)
incubationRoutes.get('/incubation/fetch/startDate/:startDate', verifyTokenMiddleware, fetchIncubationController)
incubationRoutes.get('/incubation/fetch/hatchDate/:hatchDate', verifyTokenMiddleware, fetchIncubationController)
incubationRoutes.get('/incubation/fetch/incubationState/:IncubationState', verifyTokenMiddleware, fetchIncubationController)
incubationRoutes.patch('/incubation/update/:editorId/:incubationId', verifyTokenMiddleware, updateincubationController)
incubationRoutes.delete('/incubation/delete/:editorId/:incubationId', verifyTokenMiddleware, deleteIncubationController)

export default incubationRoutes;