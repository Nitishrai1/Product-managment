import { Router } from "express";

export const adminRouter=Router();

import { DeleteAccount, LoginAdmin, ProfileData, SignupAdmin } from "../controller/admin";
import { Auth } from "../middleware/auth";




adminRouter.post("/signup",SignupAdmin); 
adminRouter.post("/signin",LoginAdmin)
adminRouter.get("/profile",Auth,ProfileData)

adminRouter.post("/deletedAccount",DeleteAccount);



















