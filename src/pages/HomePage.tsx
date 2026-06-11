import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedSellers from "../components/FeaturedSellers";
import HowItWorks from "../components/HowItWorks";
import CTA from "../components/CTA";

import { kategoriler, saticilar } from "../data/mockData";

function HomePage() {
  return (
    <>
      <Hero />
      <Categories kategoriler={kategoriler} />
      <FeaturedSellers saticilar={saticilar} />
      <HowItWorks />
      <CTA />
    </>
  );
}

export default HomePage;