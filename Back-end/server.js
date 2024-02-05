import express from "express";
import session from 'express-session';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./Config/Config.js";
import cors from "cors";
import {userRoutes} from './Routes/UserRoutes.js'
import { login,logOut } from "./Middlwares/UserAuth.js";
import { productRoutes } from "./Routes/ProductRoutes.js";
import orderRoutes from "./Routes/OrderRoutes.js";

const app = express();
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  }));

const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT;

app.listen(PORT, (error) =>{ 
    if(!error) {
        console.log("Server is Running, and App is listening on port "+ PORT) 
    } else {
        console.log("Error: ", error)
    }
} 
);
connectDB()

app.use('/user',userRoutes)
app.post("/logout", logOut);
app.post("/login", login);
app.use('/product',productRoutes)
app.use('/order',orderRoutes)
app.use('/images',express.static('images'))