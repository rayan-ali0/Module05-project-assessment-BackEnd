import express from 'express'
import { orderController } from '../Controllers/OrderController.js'
import {verifyToken} from '../Middlwares/verifyToken.js'
import {checkRole} from '../Middlwares/verifyRole.js'

const orderRoutes = express.Router()

orderRoutes.post('/create',verifyToken, orderController.createOrder)
orderRoutes.get('/readAll',  orderController.getAllOrders)
orderRoutes.get('/read/:id',  orderController.getOrderById)
orderRoutes.patch('/update/:id', orderController.updateOrder)
orderRoutes.delete('/delete/:id', orderController.deleteOrder)
export default orderRoutes