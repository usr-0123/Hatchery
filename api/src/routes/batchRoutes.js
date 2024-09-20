import { Router } from "express";
import { createNewBatchController, deleteBatchController, fetchBatchController, fetchBatchesController, fetchUJBatchesController, updateBatchController } from "../controllers/batchControllers.js";
import { verifyTokenMiddleware } from "../middlewares/authMiddlewares.js";

const batchRoutes = Router();

batchRoutes.post('/batch/new', verifyTokenMiddleware, createNewBatchController)
batchRoutes.get('/batch/fetch/all', verifyTokenMiddleware, fetchBatchesController)

batchRoutes.get('/batch/fetch/join/all', verifyTokenMiddleware, fetchUJBatchesController)

batchRoutes.get('/batch/fetch/batchId/:batchId', verifyTokenMiddleware, fetchBatchController)
batchRoutes.get('/batch/fetch/userId/:userId', verifyTokenMiddleware, fetchBatchController)
batchRoutes.get('/batch/fetch/receivedDate/:receivedDate', verifyTokenMiddleware, fetchBatchController)
batchRoutes.get('/batch/fetch/batchStatus/:batchStatus', verifyTokenMiddleware, fetchBatchController)
batchRoutes.patch('/batch/update/:editorId/:batchId', verifyTokenMiddleware, updateBatchController)
batchRoutes.delete('/batch/delete/:editorId/:batchId', verifyTokenMiddleware, deleteBatchController)

export default batchRoutes;