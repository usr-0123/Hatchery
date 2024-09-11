import { Router } from "express";
import { createNewBatchController, deleteBatchController, fetchBatchesController, updateBatchController } from "../controllers/batchControllers.js";
import { verifyTokenMiddleware } from "../middlewares/authMiddlewares.js";

const batchRoutes = Router();

batchRoutes.post('/batch/new', verifyTokenMiddleware, createNewBatchController)
batchRoutes.get('/batch/fetch/all', verifyTokenMiddleware, fetchBatchesController)
batchRoutes.get('/batch/fetch/batchId/:batchId', verifyTokenMiddleware, fetchBatchesController)
batchRoutes.get('/batch/fetch/userId/:userId', verifyTokenMiddleware, fetchBatchesController)
batchRoutes.get('/batch/fetch/receivedDate/:receivedDate', verifyTokenMiddleware, fetchBatchesController)
batchRoutes.get('/batch/fetch/batchStatus/:batchStatus', verifyTokenMiddleware, fetchBatchesController)
batchRoutes.patch('/batch/update/:batchId', verifyTokenMiddleware, updateBatchController)
batchRoutes.delete('/batch/delete/:batchId', verifyTokenMiddleware, deleteBatchController)

export default batchRoutes;