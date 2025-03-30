"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
exports.adminRouter = (0, express_1.Router)();
const admin_1 = require("../controller/admin");
exports.adminRouter.post("/signup", admin_1.SignupAdmin);
exports.adminRouter.post("/signin", admin_1.LoginAdmin);
exports.adminRouter.post("/deletedAccount", admin_1.DeleteAccount);
