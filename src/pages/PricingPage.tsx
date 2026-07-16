import Pricing from "../components/Pricing";
import usePageTitle from "../hooks/usePageTitle";

function PricingPage() {
  usePageTitle(
    "Ücretlendirme | Microvend",
    "Free ve Pro üyelik planlarını, fiyatları ve deneme koşullarını incele."
  );

  return <Pricing />;
}

export default PricingPage;
