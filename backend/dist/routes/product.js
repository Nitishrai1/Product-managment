"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const product_1 = require("../controller/product");
exports.productRouter = (0, express_1.Router)();
exports.productRouter.get("/allproducts", product_1.AllProducts);
exports.productRouter.post("/addProduct", auth_1.Auth, product_1.AddProduct);
exports.productRouter.get("/search", product_1.SearchProduct);
// productRouter.get("/:id",GetProduct)
exports.productRouter.patch("/updateProduct/:id", auth_1.Auth, product_1.UpdateProduct);
exports.productRouter.delete("/removeProduct/:id", auth_1.Auth, product_1.DeleteProdcut);
