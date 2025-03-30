"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAccount = exports.LoginAdmin = exports.SignupAdmin = void 0;
const index_1 = require("../prisma/index");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "";
const SignupAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userdata = req.body;
    try {
        const find = yield index_1.prisma.user.findFirst({
            where: {
                email: userdata.email
            }
        });
        if (find) {
            return res.status(400).json({ msg: "user already exist please signin" });
        }
        const user = yield index_1.prisma.user.create({
            data: {
                firstName: userdata.firstName,
                middleName: userdata.middleName,
                lastName: userdata.lastName,
                email: userdata.email,
                password: userdata.password
            },
            select: {
                user_id: true
            }
        });
        return res.status(201).json({ msg: "user created succesfull", user });
    }
    catch (err) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.SignupAdmin = SignupAdmin;
const LoginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userdata = req.body;
    try {
        const user = yield index_1.prisma.user.findUnique({
            where: {
                email: userdata.email,
                password: userdata.password
            },
            select: {
                user_id: true
            }
        });
        if (!user) {
            return res.status(404).json({ msg: "user not found please singup" });
        }
        const token = jsonwebtoken_1.default.sign({ user_id: user.user_id }, JWT_SECRET);
        return res.status(200).json({ msg: "user found", token: token });
    }
    catch (err) {
    }
});
exports.LoginAdmin = LoginAdmin;
const DeleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const user = yield index_1.prisma.user.findUnique({
            where: {
                email: data.email,
                password: data.password
            }
        });
        if (!user) {
            return res.status(404).json({ msg: "user not found" });
        }
        const response = yield index_1.prisma.user.delete({
            where: {
                email: data.email
            }
        });
        return res.status(200).json({ msg: "user deleted succesfull" });
    }
    catch (err) {
    }
});
exports.DeleteAccount = DeleteAccount;
