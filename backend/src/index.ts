import express from "express";
import * as dotenv from 'dotenv';
dotenv.config();
import cors from "cors"
import {adminRouter} from "./routes/admin";
import {rateLimit} from "express-rate-limit"

import {productRouter} from "./routes/product"


const app=express();
const limit=rateLimit({
    windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: 'draft-8', 
	legacyHeaders: false,
	
})

app.use(limit); // this middlewaire put limit to all the route for 100 req in 15 min


app.use(cors());
app.use(express.json());



app.use("/api/admin",adminRouter);
app.use("/api/product",productRouter);





const PORT=process.env.PORT || 5000;
console.log(PORT);

app.listen(PORT,()=>{
    console.log(`App listing on port ${PORT}`);
})


