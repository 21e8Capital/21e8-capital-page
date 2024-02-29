import {
  heroCopy,
  fundCopy,
  assetsCopy,
  strategyCopy,
  bookmarksCopy,
} from "../copy";
import {
  Bookmarks,
  Cards,
  Hero,
  Integration,
  ListingText,
} from "@/components/common";

const Home = () => (
  <div className="home">
    <Hero
      span={heroCopy.span}
      title={heroCopy.title}
      paragraphs={heroCopy.paragraphs}
    />
    <Cards title={fundCopy.title} data={fundCopy.data} />
    <ListingText
      title={strategyCopy.title}
      subtitle={strategyCopy.subtitle}
      data={strategyCopy.data}
    />
    <Integration title={assetsCopy.title} data={assetsCopy.data} />
    <Bookmarks
      title={bookmarksCopy.title}
      subtitle={bookmarksCopy.subtitle}
      data={bookmarksCopy.data}
    />
  </div>
);

export default Home;
