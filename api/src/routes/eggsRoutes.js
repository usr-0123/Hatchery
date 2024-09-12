import { Router } from "express";
import { verifyTokenMiddleware } from "../middlewares/authMiddlewares.js";
import { createNewEggController, deleteEggController, fetchEggController, fetchEggsController, updateEggController } from "../controllers/eggsController.js";

const eggsRoutes = Router();

eggsRoutes.post('/egg/new', verifyTokenMiddleware, createNewEggController)
eggsRoutes.get('/egg/fetch/all', verifyTokenMiddleware, fetchEggsController )
eggsRoutes.get('/egg/fetch/eggId/:eggId', verifyTokenMiddleware, fetchEggController)
eggsRoutes.get('/egg/fetch/batchId/:batchId', verifyTokenMiddleware, fetchEggController)
eggsRoutes.get('/egg/fetch/userId/:userId', verifyTokenMiddleware, fetchEggController)
eggsRoutes.get('/egg/fetch/collectionDate/:collectionDate', verifyTokenMiddleware, fetchEggController)
eggsRoutes.patch('/egg/update/:editorId/:eggId', verifyTokenMiddleware, updateEggController)
eggsRoutes.delete('/egg/delete/:editorId/:eggId', verifyTokenMiddleware, deleteEggController)

export default eggsRoutes;