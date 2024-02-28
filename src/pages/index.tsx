import { hero, fund, assets, strategy, bookmarks } from "../copy/text";
import {
  Cards,
  Hero,
  Integration,
  ListingText,
  WorkInProgress,
} from "@/components/common";

const Home = () => (
  <div className="home">
    <Hero span={hero.span} title={hero.title} paragraphs={hero.paragraphs} />
    <Cards title={fund.title} data={fund.data} />
    <ListingText
      textStart
      title={strategy.title}
      subtitle={strategy.subtitle}
      data={strategy.data}
    />
    <Integration title={assets.title} data={assets.data} />
    <ListingText
      title={bookmarks.title}
      subtitle={bookmarks.subtitle}
      data={bookmarks.data}
    />
  </div>
);

export default Home;
