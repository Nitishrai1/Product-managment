import { Router } from "express";
import { Auth } from "../middleware/auth";
import { AddProduct, AllProducts, DeleteProdcut, GetProduct, SearchProduct,UpdateProduct } from "../controller/product";

export const productRouter=Router();



productRouter.get("/allproducts",AllProducts);
productRouter.post("/addProduct",Auth,AddProduct);


productRouter.get("/search",SearchProduct)
// productRouter.get("/:id",GetProduct)


productRouter.patch("/updateProduct/:id",Auth,UpdateProduct);
productRouter.delete("/removeProduct/:id",Auth,DeleteProdcut)








