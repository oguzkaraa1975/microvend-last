import Hero from "../components/Hero";
import Categories from "../components/Categories";
import NewBusinesses from "../components/home/NewBusinesses";
import MembershipBand from "../components/home/MembershipBand";
import WeeklyPick from "../components/home/WeeklyPick";
import NeedsGrid from "../components/home/NeedsGrid";
import ProducerStory from "../components/home/ProducerStory";
import CTA from "../components/CTA";

import { categories } from "../data/mockData";
import usePageTitle from "../hooks/usePageTitle";

function HomePage() {
  usePageTitle(
    "Microvend | Bağımsız üreticiler ve küçük işletmeler rehberi"
  );

  return (
    <>
      <Hero />
      <Categories categories={categories} />
      <NewBusinesses />
      <MembershipBand />
      <WeeklyPick />
      <NeedsGrid />
      <ProducerStory />
      <CTA />
    </>
  );
}

export default HomePage;
