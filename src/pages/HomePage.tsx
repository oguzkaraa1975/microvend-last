import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedSellers from "../components/FeaturedSellers";
import HowItWorks from "../components/HowItWorks";
import CTA from "../components/CTA";

import { categories, sellers } from "../data/mockData";
import usePageTitle from "../hooks/usePageTitle";

function HomePage() {
  usePageTitle("Microvend | Mikro işletmeler için dijital vitrin");

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
