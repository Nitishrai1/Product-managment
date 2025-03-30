import { Router } from "express";

export const adminRouter=Router();

import { DeleteAccount, LoginAdmin, SignupAdmin } from "../controller/admin";




adminRouter.post("/signup",SignupAdmin); 
adminRouter.post("/signin",LoginAdmin)


adminRouter.post("/deletedAccount",DeleteAccount);



















