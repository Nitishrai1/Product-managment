import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { ChangeEvent, FormEvent } from "react"; // Import React types

export default function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    category: "",
    price: "",
    rating: "",
  });
  const { addProduct } = useProduct();

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = async (e: FormEvent) => { // Use FormEvent for form submission
    e.preventDefault();

    try {
      console.log("added product data:", product);
      await addProduct(product);

      console.log("Product updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { // Use ChangeEvent for input and textarea
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Product Name*</label>
            <input
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter product name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description*</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter product description"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category*</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter product category"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price ($)*</label>
            <input
              type="text"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter product price"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Rating</label>
            <input
              type="text"
              name="rating"
              value={product.rating}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter product rating"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
