import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export interface Product {
  product_id: string;
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

interface UpdateProduct {
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
  updateProduct: (id: string, updatedProductData: UpdateProduct) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Promise<Product | null>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const { token } = useAuth();
  const [product, setProduct] = useState<Product[]>([]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/product/allproducts`);
      // console.log(`in context`,res.data)
      console.log(`p`,res.data.product);
      setProduct(res.data.product); 
      console.log(`in context p ${product}`)
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const getProductById = async (id: string): Promise<Product | null> => {
    try {
      const res = await axios.get(`${apiUrl}/api/product/${id}`);
      return res.data || null; 
    } catch (err) {
      console.error("Error fetching product by ID:", err);
      return null;
    }
  };

  const addProduct = async (productData: NewProduct) => {
    try {
      await axios.post(
        `${apiUrl}/api/product/addProduct`,
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

  const updateProduct = async (id: string, updatedProductData: UpdateProduct) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/api/product/updateProduct/${id}`,
        updatedProductData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        fetchProduct(); 
      } else {
        alert("Error updating the product");
      }
    } catch (err) {
      console.error("Error updating the product:", err);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/product/removeProduct/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        fetchProduct(); 
      } else {
        alert("Error deleting the product");
      }
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
