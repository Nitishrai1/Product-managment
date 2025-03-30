import { Star } from "lucide-react"
import { useProduct } from "../context/ProductContext"

// Define types for the product prop
interface Product {
  product_id: string 
  productName: string
  description: string
  category: string
  price: number
  rating: number
  createdAt: string
}

// Define the props for the ProductCard component
interface ProductCardProps {
  product: Product
  onEdit?: (productId: string | number) => void
}

export default function ProductCard({ product, onEdit }: ProductCardProps) {
  const {
    product_id,
    productName = "Untitled Product",
    description = "No description provided",
    category = "Uncategorized",
    price = 0,
    rating = 0,
    createdAt,
  } = product

  const { deleteProduct } = useProduct()

  // Format the date to a readable format
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  // Render stars based on the rating
  const renderStars = () => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      )
    }
    return stars
  }

  // Edit product handler
  const handleEdit = () => {
    console.log(`product id in card ${product_id}`)
    if (onEdit) {
      onEdit(product_id)
    }
  }

  // Remove product handler
  const removeProduct = async () => {
    try {
      deleteProduct(product_id)
      console.log("product removed")
    } catch (error) {
      console.error("Error removing product:", error)
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-3xl p-6 my-4 mx-2 transition-transform transform hover:scale-105 border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold">{productName}</h3>
        <span className="text-lg font-bold text-purple-600">${price.toFixed(2)}</span>
      </div>

      <p className="text-sm text-gray-500 mb-4">{description}</p>

      <div className="flex items-center mb-3">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full mr-2">{category}</span>
        <span className="text-xs text-gray-500">Added on {formattedDate}</span>
      </div>

      <div className="flex items-center mt-3">
        <div className="flex mr-2">{renderStars()}</div>
        <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleEdit}
          className="bg-purple-600 text-white py-2 px-4 rounded-3xl hover:bg-purple-700 transition"
        >
          Edit Product
        </button>
        <button
          onClick={removeProduct}
          className="bg-blue-500 text-white py-2 px-4 rounded-3xl hover:bg-blue-600 transition"
        >
          Remove
        </button>
      </div>
    </div>
  )
}
