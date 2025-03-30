"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "1234";
const Auth = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        console.log(authHeader);
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(403).json({ msg: "Not authorized from middleware" });
            return;
        }
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        //using req as any to bypass assertion the typescript error 
        console.log(`userid in middlewire ${decoded.user_id}`);
        req.user = { user_id: decoded.user_id };
        next();
    }
    catch (err) {
        res.status(401).json({ msg: "Invalid or expired token" });
    }
};
exports.Auth = Auth;
