import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import DiscoverPage from "./pages/DiscoverPage";
import CollectionsPage from "./pages/CollectionsPage";
import CollectionDetailPage from "./pages/CollectionDetailPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import FavoritesPage from "./pages/FavoritesPage";
import AuthProvider from "./auth/AuthProvider";
import LegalDraftPage from "./pages/LegalDraftPage";
import RedirectWithQuery from "./components/RedirectWithQuery";
import SellerDetailPage from "./pages/SellerDetailPage";
import PricingPage from "./pages/PricingPage";
import ApplyPage from "./pages/ApplyPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-paper text-ink">
          <Header />

          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/kesfet" element={<DiscoverPage />} />
              <Route path="/kategoriler" element={<CategoriesPage />} />
              <Route
                path="/kategoriler/:slug"
                element={<CategoryDetailPage />}
              />
              <Route path="/seckiler" element={<CollectionsPage />} />
              <Route
                path="/seckiler/:slug"
                element={<CollectionDetailPage />}
              />
              <Route path="/iletisim" element={<ContactPage />} />
              <Route path="/giris" element={<LoginPage />} />
              <Route path="/uye-ol" element={<SignUpPage />} />
              <Route path="/sifre-sifirlama" element={<PasswordResetPage />} />
              <Route path="/favoriler" element={<FavoritesPage />} />
              <Route
                path="/gizlilik"
                element={<LegalDraftPage variant="gizlilik" />}
              />
              <Route
                path="/kullanim-kosullari"
                element={<LegalDraftPage variant="kullanim-kosullari" />}
              />
              <Route
                path="/saticilar"
                element={<RedirectWithQuery to="/kesfet" />}
              />
              <Route path="/saticilar/:slug" element={<SellerDetailPage />} />
              <Route path="/ucretlendirme" element={<PricingPage />} />
              <Route path="/basvuru" element={<ApplyPage />} />
              <Route path="/hakkimizda" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
