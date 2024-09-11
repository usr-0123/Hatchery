import { Router } from "express";
import { verifyTokenMiddleware } from "../middlewares/authMiddlewares.js";
import { createNewChickController, deleteChickController, fetchChickController, fetchChicksController, updateChicksController } from "../controllers/chicksControllers.js";

const chickRoutes = Router();

chickRoutes.post('/chicks/new', verifyTokenMiddleware, createNewChickController )
chickRoutes.get('/chicks/fetch/all', verifyTokenMiddleware, fetchChicksController )
chickRoutes.get('/chicks/fetch/chickId/:chickId', verifyTokenMiddleware, fetchChickController )
chickRoutes.get('/chicks/fetch/batchId/:batchId', verifyTokenMiddleware, fetchChickController )
chickRoutes.get('/chicks/fetch/hatchRecordId/:hatchRecordId', verifyTokenMiddleware, fetchChickController )
chickRoutes.get('/chicks/fetch/chickType/:chickType', verifyTokenMiddleware, fetchChickController )
chickRoutes.get('/chicks/fetch/healthStatus/:healthStatus', verifyTokenMiddleware, fetchChickController )
chickRoutes.patch('/chicks/update/:chickId', verifyTokenMiddleware, updateChicksController)
chickRoutes.delete('/chicks/delete/:chickId', verifyTokenMiddleware, deleteChickController)

export default chickRoutes;