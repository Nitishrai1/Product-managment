import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

export interface Product {
  id: string;
  productName: string;
  price: string;
  description: string;
  rating: string;
  category: string;

}

interface NewProduct {
  productName: string;
  price: string;
  description: string;
  rating: string;
  category: string;

}

interface updateProdcut {
  productName: string;
  price: string;
  description: string;
  rating: string;
  category: string;
}

interface ProductContextType {
  product: Product[];
  fetchProduct: () => void;
  addProduct: (productData: NewProduct) => void;
  updateProduct: (id: string, updatedProductData: updateProdcut) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string)=>string;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);



export const ProductProvider = ({ children }) => {
  const { token } = useAuth();
  const [product, setProduct] = useState<Product[]>([]);

  const fetchProduct = async () => {
    try {

      
      const res = await axios.get(`http://localhost:3000/api/product/allproducts`);
      console.log(res.data.product);
      setProduct(res.data.product);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const getProductById=async (id:string)=>{
    try{

      const product=await axios.get("/api/product/:id");
      const productdata=product.data;
      return productdata;
     
    }catch(err){

      console.log("error in getting the product data");
    }
  }


  const addProduct = async (productData: NewProduct) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/product/addProduct",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchProduct();
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const updateProduct = async (id: string, updatedProductData: updateProdcut) => {
    try {
      console.log(`updatedProductData in frontend ${JSON.stringify(updatedProductData)}`)
      const response = await axios.patch(
        `http://localhost:3000/api/product/updateProduct/${id}`,
        updatedProductData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if(!response){
        alert("error in updating the product");
      }
      fetchProduct();
    } catch (err) {
      console.error("Error updating the product:", err);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      console.log("insidet the deltete front")
      const response = await axios.delete(`http://localhost:3000/api/product/removeProduct/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response){
        console.log("product removed sucess")
      }
      fetchProduct();
    } catch (err) {
      console.error("Error deleting the product:", err);
    }
  };

  return (
    <ProductContext.Provider value={{ product, fetchProduct, addProduct, updateProduct, deleteProduct, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
