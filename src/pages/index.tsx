import { Cards, Hero, IntegrationCard, Subtitle } from "@/components/common";
import { hero, fund, assets, strategy, bookmarks } from "../copy/text";
import { BitcoinSVG, EthSVG, RuneSVG } from "@/svg";
import Bookmarks from "@/components/common/Bookmarks";

const styleSection: string = "my-10 md:my-16 px-4 md:px-16 lg:px-64";
const styleSectionWide: string = "my-10 md:my-16 px-4 md:px-0 lg:px-0";

export default function Home() {
  return (
    <div className="home">
      <Hero title={hero.title} paragraphs={hero.paragraphs} />

      <section className={`${styleSectionWide}`}>
        <div className="flex flex-col">
          <header className="flex flex-row justify-center">
            <Subtitle text={fund.title} />
          </header>
          <Cards data={fund.data} />
        </div>
      </section>

      {/* # BITCOIN */}
      <section className={`${styleSection}`}>
        <div className="flex flex-col">
          <header className="flex flex-row justify-center">
            <Subtitle text={strategy.title} />
          </header>
          <div className="my-5 md:my-8">
            <p>{strategy.subtitle}</p>
            <br></br>
            <ul className="list-disc list-inside">
              <li>
                <strong>{strategy.bullet1Title}</strong> {strategy.bullet1Para}
              </li>
              <li>
                <strong>{strategy.bullet2Title}</strong> {strategy.bullet2Para}
              </li>
              <li>
                <strong>{strategy.bullet3Title}</strong> {strategy.bullet3Para}
              </li>
              <li>
                <strong>{strategy.bullet4Title}</strong> {strategy.bullet4Para}
              </li>
              <li>
                <strong>{strategy.bullet5Title}</strong> {strategy.bullet5Para}
              </li>
              <li>
                <strong>{strategy.bullet6Title}</strong> {strategy.bullet6Para}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* # ASSETS */}
      <section className={`${styleSectionWide}`}>
        <div className="flex flex-col">
          <header className="flex flex-row justify-center">
            <Subtitle text={assets.title} />
          </header>
          <div className="mt-6 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-20 gap-y-10 lg:gap-y-12">
            <IntegrationCard
              key="bitcoin"
              icon={<BitcoinSVG />}
              name={assets.bullet1Title}
              url={`${assets.bullet1Url}`}
              description={assets.bullet1Para}
            />
            <IntegrationCard
              key="layer1"
              icon={<EthSVG />}
              name={assets.bullet2Title}
              url={`${assets.bullet2Url}`}
              description={assets.bullet2Para}
            />
            <IntegrationCard
              key="defi"
              icon={<RuneSVG />}
              name={assets.bullet3Title}
              url={`${assets.bullet3Url}`}
              description={assets.bullet3Para}
            />
          </div>
        </div>
      </section>

      <Bookmarks
        title={bookmarks.title}
        subtitle={bookmarks.subtitle}
        data={bookmarks.data}
      />
    </div>
  );
}
