import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import UserRoutes from "./routes/UserRoute.js";
import AuthRoutes from "./routes/AuthRoute.js";
import GlobalRoutes from "./routes/GlobalRoute.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json({limit:"100mb"}));
app.use(UserRoutes);
app.use(AuthRoutes);
app.use(GlobalRoutes);
app.listen('5000',()=>console.log('server up'));