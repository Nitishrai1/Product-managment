import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useProduct } from "../context/ProductContext";

export default function EditProductCard() {
  const location = useLocation();
  const { id } = location.state || {}; 
  const navigate = useNavigate();
  
 
  const [editedProduct, setEditedProduct] = useState({
    productName: "",
    description: "",
    category: "",
    price: "",
    rating: "",
  });

  const { updateProduct} = useProduct(); 

  const handleCancel = () => {
    navigate("/"); 
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      console.log("Updated product data:", editedProduct); 
     await updateProduct(id, editedProduct);

      
     
            console.log("Product updated successfully");

            navigate("/"); 
        
      
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  
  const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
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
              value={editedProduct.productName} 
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter product name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description*</label>
            <textarea
              name="description"
              value={editedProduct.description}
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
              value={editedProduct.category} 
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
              value={editedProduct.price} 
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
              value={editedProduct.rating}
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
