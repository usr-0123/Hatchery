import { Router } from "express";
import { verifyTokenMiddleware } from "../middlewares/authMiddlewares.js";
import { createNewProductPriceController, deleteProductPriceController, fetchProductPriceController, fetchProductsPricesController, updateProductPriceController } from "../controllers/productPriceController.js";

const productPriceRoutes = Router();

productPriceRoutes.post('/product-price/new', verifyTokenMiddleware, createNewProductPriceController)
productPriceRoutes.get('/product-price/fetch/all', verifyTokenMiddleware, fetchProductsPricesController)
productPriceRoutes.get('/product-price/fetch/product-price-id/:productPriceId', verifyTokenMiddleware, fetchProductPriceController)
productPriceRoutes.get('/product-price/fetch/product-name/:product_name', verifyTokenMiddleware, fetchProductPriceController)
productPriceRoutes.get('/product-price/fetch/price/:price', verifyTokenMiddleware, fetchProductPriceController)
productPriceRoutes.get('/product-price/fetch/currency/:currency', verifyTokenMiddleware, fetchProductPriceController)
productPriceRoutes.get('/product-price/fetch/date-updated/:date_updated', verifyTokenMiddleware, fetchProductPriceController)
productPriceRoutes.patch('/product-price/update/:editorId/:productPriceId', verifyTokenMiddleware, updateProductPriceController)
productPriceRoutes.delete('/product-price/delete/:editorId/:productPriceId', verifyTokenMiddleware, deleteProductPriceController)

export default productPriceRoutes;