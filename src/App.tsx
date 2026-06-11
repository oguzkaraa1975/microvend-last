import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import SellersPage from "./pages/SellersPage";
import SellerDetailPage from "./pages/SellerDetailPage";
import PricingPage from "./pages/PricingPage";
import ApplyPage from "./pages/ApplyPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#fcfcfc] text-gray-900">
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/kategoriler" element={<CategoriesPage />} />
            <Route path="/saticilar" element={<SellersPage />} />
            <Route path="/saticilar/:slug" element={<SellerDetailPage />} />
            <Route path="/ucretlendirme" element={<PricingPage />} />
            <Route path="/basvuru" element={<ApplyPage />} />
            <Route path="/hakkimizda" element={<AboutPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;