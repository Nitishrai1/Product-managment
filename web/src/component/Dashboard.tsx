import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ProductCard from "./Card";
import axios from "axios";

interface Product {
  product_id: string;
  productName: string;
  price: string;
  description: string;
  rating: string;
  category: string;
}

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [filteredProduct, setFilteredProduct] = useState<Product[]>([]); 
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/product/allproducts`);
      console.log("Fetched products:", JSON.stringify(res.data.product, null, 2));
      setFilteredProduct(res.data.product);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const searchQueryParam = debouncedSearchQuery || "";
        const response = await axios.get(`${apiUrl}/api/product/search?search=${searchQueryParam}`);

        if (response.data.products) {
          setFilteredProduct(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    };

    if (debouncedSearchQuery) {
      fetchFilteredProducts();
    } else {
      fetchProducts(); 
    }
  }, [debouncedSearchQuery]);

  const handleEditProduct = (product_id: string) => {
    navigate("/EditProduct", { state: { id: product_id } });
  };

  const handleAddProduct = () => {
    navigate("/Addproduct");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleLogout}
        className="bg-green-600 absolute top-4 right-4 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition mb-6"
      >
        Log out
      </button>
      <h1 className="text-2xl font-bold mb-6">Products Dashboard</h1>

      <button
        onClick={handleAddProduct}
        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition mb-6"
      >
        Add New Product
      </button>

      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Name or Description"
          className="p-2 border rounded-lg w-1/3"
        />
      </div>

      <div className="flex justify-end gap-6 mb-6">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">Filter by Category</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home</option>
          <option value="toys">Toys</option>
        </select>

        <div className="flex items-center gap-4">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            placeholder="Min Price"
            className="p-2 border rounded-lg w-24"
            min="0"
          />
          <span>-</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            placeholder="Max Price"
            className="p-2 border rounded-lg w-24"
            min="0"
          />
        </div>

        <input
          type="number"
          value={ratingFilter}
          onChange={(e) => setRatingFilter(Number(e.target.value))}
          placeholder="Min Rating"
          className="p-2 border rounded-lg"
          min="0"
          max="5"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProduct.length > 0 ? (
          filteredProduct.map((item) => (
            <ProductCard key={item.product_id} product={item} onEdit={() => handleEditProduct(item.product_id)} />
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
}
