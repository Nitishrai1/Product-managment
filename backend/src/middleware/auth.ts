import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


const JWT_SECRET = process.env.JWT_SECRET || "1234";

interface CustomRequest extends Request {
    user?: { user_id: string };
  }
  

export const Auth = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers["authorization"];
        console.log(authHeader);
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(403).json({ msg: "Not authorized from middleware" });
            return;
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { user_id: string };
        //using req as any to bypass assertion the typescript error 
        console.log(`userid in middlewire ${decoded.user_id}`);
        req.user = { user_id: decoded.user_id };

        next();
    } catch (err) {
        res.status(401).json({ msg: "Invalid or expired token" });
    }
};
