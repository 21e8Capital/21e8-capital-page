import Image from 'next/image'
import { IconLink, Card, IntegrationCard, Subtitle, ButtonLink, TextLink, IconClass } from '@components'

import { logoPath, logoAlt, hero, fund, assets, strategy, bookmarks, social } from '../../copy/text';

const styleHeader: string = 'mt-5 md:mt-10 mb-10 md:mb-16'
const styleSection: string = 'my-10 md:my-16 px-4 md:px-16 lg:px-64'
const styleSectionWide: string = 'my-10 md:my-16 px-4 md:px-0 lg:px-0'
const stylePara: string = 'text-center my-5 md:my-8 text-sm md:text-lg'
const styleFooter: string = 'flex flex-col mt-5 md:mt-10 mb-20 md:mb-40 text-center gap-y-7 md:gap-y-10'

export default function Home() {
  return (
    <main className='flex flex-col text-primary 2xl:px-60 antialiased'>

      {/* # HEADING */}
      <header className={`${styleHeader}`}>
        <div className='hidden md:flex flex-row '>
          <Image className='text-center' src={logoPath} width={110} height={110} alt={logoAlt} />
        </div>
        <div className='flex md:hidden flex-row '>
          <Image className='text-center' src={logoPath} width={70} height={70} alt={logoAlt} />
        </div>
      </header>

      {/* # HERO */}
      <section className={`${styleSection}`}>
        <div className='flex flex-col'>
          <header className='flex flex-row justify-center'>
            <Subtitle text={hero.subtitle} size='lg' />
          </header>
          <p className={`${stylePara}`}>{hero.para1}</p>
          <p className={`${stylePara}`}>{hero.para2}</p>
        </div>
      </section>

      {/* # FUND */}
      <section className={`${styleSectionWide}`}>
        <div className='flex flex-col'>
          <header className='flex flex-row justify-center'>
            <Subtitle text={fund.title} />
          </header>
          <div className='my-5 md:my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6'>
            <Card title={fund.card1Title}>
              <p>{fund.card1Para}</p>
            </Card>
            <Card title={fund.card2Title}>
              <p>{fund.card2Para}</p>
            </Card>
            <Card title={fund.card3Title}>
              <p>{fund.card3Para}</p>
            </Card>
            <Card title={fund.card4Title}>
              <p>{fund.card4Para}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* # BITCOIN */}
      <section className={`${styleSection}`}>
        <div className='flex flex-col'>
          <header className='flex flex-row justify-center'>
            <Subtitle text={strategy.title} />
          </header>
          <div className='my-5 md:my-8'>
            <p>{strategy.subtitle}</p>
            <br></br>
            <ul className='list-disc list-inside'>
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
        <div className='flex flex-col'>
          <header className='flex flex-row justify-center'>
            <Subtitle text={assets.title} />
          </header>
          <div className='mt-6 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-20 gap-y-10 lg:gap-y-12'>
            <IntegrationCard key='bitcoin' iconClass={IconClass.BTC} name={assets.bullet1Title} url={`${assets.bullet1Url}`} description={assets.bullet1Para} />
            <IntegrationCard key='layer1' iconClass={IconClass.L1} name={assets.bullet2Title} url={`${assets.bullet2Url}`} description={assets.bullet2Para} />
            <IntegrationCard key='defi' iconClass={IconClass.DEFI} name={assets.bullet3Title} url={`${assets.bullet3Url}`} description={assets.bullet3Para} />
          </div>
        </div>
      </section>


      {/* # BOOKMARKS */}
      <section className={`${styleSection}`}>
        <div className='flex flex-col items-center'>
          <header className='flex flex-row justify-center'>
            <Subtitle text={bookmarks.title} />
          </header>
          <p className='text-center my-5 md:my-8'>{bookmarks.subtitle}</p>

          <ul className='list-disc list-inside'>
            <li>
              <a href={`${bookmarks.bullet1Url}`} target='_blank' rel='noreferrer'>
                <u><strong>{bookmarks.bullet1Title}</strong></u>
              </a>
              {bookmarks.bullet1Para}
            </li>
            <br></br>
            <li>
            <a href={`${bookmarks.bullet2Url}`} target='_blank' rel='noreferrer'>
                <u><strong>{bookmarks.bullet2Title}</strong></u>
              </a>
              {bookmarks.bullet2Para}
            </li>
            <br></br>
            <li>
            <a href={`${bookmarks.bullet3Url}`} target='_blank' rel='noreferrer'>
                <u><strong>{bookmarks.bullet3Title}</strong></u>
              </a> 
              {bookmarks.bullet3Para}
            </li>
            <br></br>
            <li>
            <a href={`${bookmarks.bullet4Url}`} target='_blank' rel='noreferrer'>
                <u><strong>{bookmarks.bullet4Title}</strong></u>
              </a> 
              {bookmarks.bullet4Para}
            </li>
            <br></br>
            <li>
            <a href={`${bookmarks.bullet5Url}`} target='_blank' rel='noreferrer'>
                <u><strong>{bookmarks.bullet5Title}</strong></u>
              </a> 
              {bookmarks.bullet5Para}
            </li>
            <br></br>
            <li>
            <a href={`${bookmarks.bullet1Url}`} target='_blank' rel='noreferrer'>
                <u><strong>{bookmarks.bullet1Title}</strong></u>
              </a> 
              {bookmarks.bullet6Para}
            </li>
          </ul>
        </div>
      </section>

      {/* # FOOTER */}
      <footer className={`${styleFooter}`}>
        <strong>{social.title}</strong>
        <div className='flex flex-row justify-center items-center gap-x-8 md:gap-x-20 '>
          <IconLink iconClass={IconClass.X} url={social.x} />
          <IconLink iconClass={IconClass.GITHUB} url={social.github} />

        </div>
      </footer>


    </main>
  )
}

