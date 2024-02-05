import express from "express";
import { userController } from "../Controllers/UserController.js";
import {verifyToken} from '../Middlwares/verifyToken.js'
import {checkRole} from '../Middlwares/verifyRole.js'
export const userRoutes = express.Router();

//verifyToken,checkRole(['user,admin']) 
userRoutes.post('/register',userController.register);
userRoutes.get('/all',  userController.getAllUsers);
userRoutes.get('/:id',  userController.getUserById);
userRoutes.put('/:id',  userController.updateUserById);
userRoutes.delete('/:id',  userController.deleteUserById);
userRoutes.get('/read/logged',  userController.getOneUser);

export default userRoutes;