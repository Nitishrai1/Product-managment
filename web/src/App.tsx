import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { Dashboard } from "./component/Dashboard";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import { useAuth } from "./context/AuthContext";
import EditProductCard from "./component/Edit";
import AddProduct from "./component/AddProduct";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard /> : <Signin />}
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/EditProduct" element={<EditProductCard />} />
          <Route path="/Addproduct" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
