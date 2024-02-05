import express from "express"
import { productController} from "../Controllers/ProductController.js"
import uploadImage from "../Middlwares/Multer.js"
import {verifyToken} from '../Middlwares/verifyToken.js'
import {checkRole} from '../Middlwares/verifyRole.js'
export const productRoutes= express.Router()

productRoutes.post('/create', uploadImage.single("image"),productController.createProduct)
productRoutes.get('/:id',productController.getProductById)
productRoutes.get('/read/all',productController.getProducts)
productRoutes.delete('/:id',productController.deleteProduct)
productRoutes.put('/update',uploadImage.single("image"),productController.editProduct)
