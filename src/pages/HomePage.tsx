import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedSellers from "../components/FeaturedSellers";
import HowItWorks from "../components/HowItWorks";
import CTA from "../components/CTA";

import { categories, sellers } from "../data/mockData";

function HomePage() {
  return (
    <>
      <Hero />
      <Categories categories={categories} />
      <FeaturedSellers sellers={sellers} />
      <HowItWorks />
      <CTA />
    </>
  );
}

export default HomePage;
