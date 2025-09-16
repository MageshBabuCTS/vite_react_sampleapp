import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Layout from './components/DefaultLayout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AddProductPage from './pages/AddProductPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProductDetailPage from "./components/ProductDetailPage";
import ProtectedNotFoundPage from "./components/ProtectedNotFoundPage";

function App() {
  return (    
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="login" replace />} />
        <Route element={<ProtectedRoute />}>  {/* Handles both auth and layout */}
                {/* These routes will be wrapped in the appropriate layout based on user role */}
                <Route path="/home" element={<HomePage />} />
                <Route path="/add-product" element={<AddProductPage />} />
                 <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path="*" element={<ProtectedNotFoundPage />} />
          </Route>               
      </Routes>  
  );
}

export default App;
