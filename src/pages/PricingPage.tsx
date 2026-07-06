import Pricing from "../components/Pricing";
import usePageTitle from "../hooks/usePageTitle";

function PricingPage() {
  usePageTitle("Ücretlendirme | Microvend");

  return (
    <div className="py-8">
      <Pricing />
    </div>
  );
}

export default PricingPage;
