import { Router } from "express";
import { verifyTokenMiddleware } from "../middlewares/authMiddlewares.js";
import { createNewSaleController, deleteSalesController, fetchSaleController, fetchSalesController, updateSalesController } from "../controllers/salesController.js";

const salesRoutes = Router();

salesRoutes.post('/sales/new', verifyTokenMiddleware, createNewSaleController)
salesRoutes.get('/sales/fetch/all', verifyTokenMiddleware, fetchSalesController)
salesRoutes.get('/sales/fetch/saleId/:saleId', verifyTokenMiddleware, fetchSaleController)
salesRoutes.get('/sales/fetch/batchId/:batchId', verifyTokenMiddleware, fetchSaleController)
salesRoutes.get('/sales/fetch/chickId/:chickId', verifyTokenMiddleware, fetchSaleController)
salesRoutes.get('/sales/fetch/saleDate/:saleDate', verifyTokenMiddleware, fetchSaleController)
salesRoutes.patch('/sales/update/:editorId/:saleId', verifyTokenMiddleware, updateSalesController)
salesRoutes.delete('/sales/delete/:editorId/:saleId', verifyTokenMiddleware, deleteSalesController)

export default salesRoutes;