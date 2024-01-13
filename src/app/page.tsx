import { Card, IntegrationCard, Subtitle, ButtonLink, TextLink, IconClass } from '@components'

import { hero, fund, assets } from '../../copy/text';

export default function Home () {
  return (
    <main className='flex flex-col'>
      <section className='md:mb-20 mb-12 px-4 md:px-16 lg:px-64'>
        <div className='flex flex-col'>
          <header className='flex flex-row justify-center'>
            <Subtitle text={hero.subtitle} size='lg'/>
          </header>
          <p className='text-center mt-3 md:mt-6 text-sm md:text-lg'>{hero.para}</p>
        </div>
      </section>
      <section className='md:mb-28 mb-14 px-4 md:px-16 lg:px-20'>
        <div className='flex flex-col'>
          <header className='flex flex-row justify-center'>
            <Subtitle text={fund.title}/>
          </header>
          <div className='mt-3 md:mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6'>
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
      <section className='md:mb-28 mb-14 px-8 md:px-16 lg:px-20'>
        <div className='flex flex-col'>
          <header className='flex flex-row justify-center'>
            <Subtitle text={assets.title}/>
          </header>
          <div className='mt-6 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-20 gap-y-10 lg:gap-y-12'>
              <IntegrationCard key='lends' iconClass={IconClass.BTC} name='Lends' url='https://www.lends.so/' description="The fearless trailblazers in the world of loans. From bold ventures into lending territories to whipping up stellar features, they'are turning heads."/>
              <IntegrationCard key='asgardex' iconClass={IconClass.L1}name='Asgardex' url='https://github.com/asgardex/asgardex-desktop' description='The guardians of the desktop space. Their dedication to open-source and resisting censorship? Nothing short of legendary.'/>
              <IntegrationCard key='swapper' iconClass={IconClass.DEFI} name='Swapper' url='https://swapper.market/' description='The heroes with dreams bigger than the cosmos. A simple UI and a vision to make your crypto journey seamless. Expect big things!'/>
          </div>
        </div>
      </section>
      <section className='md:mb-28 mb-14 px-4 md:px-16 lg:px-36'>
        <div className='flex flex-col'>
          <header className='flex flex-row justify-center'>
            <Subtitle text='XChainJS features'/>
          </header>
          <div className='mt-3 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-20 gap-y-6 lg:gap-y-12'>
            <Card title='Supported Chains'>
              <div className='flex flex-col'>
                <div>
                  <span className='inline-block'><TextLink text='AVAX' url='https://www.avax.network/' underlined/></span>
                  <p className='inline'>, </p>
                  <span className='inline-block'><TextLink text='BSC' url='https://docs.bnbchain.org/docs/learn/intro' underlined/></span>
                  <p className='inline'>, </p>
                  <span className='inline-block'><TextLink text='BNB CHAIN' url='https://docs.bnbchain.org/docs/learn/beaconIntro' underlined/></span>
                  <p className='inline'>, </p>
                  <span className='inline-block'><TextLink text='BITCOIN' url='https://bitcoin.org/en/' underlined/></span>
                  <p className='inline'>, </p>
                  <span className='inline-block'><TextLink text='BITCOIN CASH' url='https://bitcoincash.org/en/' underlined/></span>
                  <p className='inline'>, </p>
                  <span className='inline-block'><TextLink text='COSMOS' url='https://cosmos.network/' underlined/></span>
                  <p className='inline'>, </p>
                  <span className='inline-block'><TextLink text='DASH' url='https://www.dash.org/' underlined/></span>
                  <p className='inline'>, </p>
                  <span className='inline-block'><TextLink text='DOGE' url='https://dogecoin.com/' underlined/></span>
                  <p className='inline'>, </p>
                  <span className='inline-block'><TextLink text='ETHEREUM' url='https://ethereum.org/en/' underlined/></span>
                  <p className='inline'>, </p>
                  <span className='inline-block'><TextLink text='ARBITRUM' url='https://arbitrum.io/' underlined/></span>
                  <p className='inline'>, </p>
                  <span className='inline-block'><TextLink text='KUJIRA' url='https://kujira.network/' underlined/></span>
                  <p className='inline'>, </p>
                  <span className='inline-block'><TextLink text='LITECOIN' url='https://litecoin.org/' underlined/></span>
                  <p className='inline'>, </p>
                  <span className='inline-block'><TextLink text='MAYACHAIN' url='https://www.mayaprotocol.com/' underlined/></span>
                  <p className='inline'> and </p>
                  <span className='inline-block'><TextLink text='THORCHAIN' url='https://thorchain.org/' underlined/></span>
                </div>
                <ul className='mt-6'>
                  <li className='flex flex-wrap'><TextLink text='○ Signature and transmission of transactions' url='https://docs.xchainjs.org/xchain-client/overview.html#transfer'/></li>
                  <li className='flex flex-wrap'><TextLink text='○ Balance inquiries' url='https://docs.xchainjs.org/xchain-client/overview.html#get-balance'/></li>
                  <li className='flex flex-wrap'><TextLink text='○ Transaction history and details' url='https://docs.xchainjs.org/xchain-client/overview.html#get-transactions'/></li>
                  <li className='flex flex-wrap'><TextLink text='○ Fee estimates' url='https://docs.xchainjs.org/xchain-client/overview.html#get-fees'/></li>
                </ul>
              </div>
            </Card>
            <Card title='Protocols'>
              <div className='flex flex-col'>
                <p>Featuring THORChain now, with Maya on the horizon. Get ready for:</p>
                <ul className='mt-6'>
                  <li className='flex flex-wrap'><TextLink text='○ Multi-chain swaps, including BTC!' url='https://github.com/xchainjs/xchainjs-lib/tree/master/examples/do-swap'/></li>
                  <li className='flex flex-wrap'><TextLink text='○ Native interest rates' url='https://github.com/xchainjs/xchainjs-lib/tree/master/examples/liquidity'/></li>
                  <li className='flex flex-wrap'><TextLink text='○ Open loans without liquidation' url='https://github.com/xchainjs/xchainjs-lib/blob/master/examples/loans'/></li>
                  <li className='flex flex-wrap'><TextLink text='○ Custom nameservice (THORname)' url='https://docs.xchainjs.org/xchain-thorchain-amm/available-functions/thorchain-amm.html#getthornamesbyaddress'/></li>
                </ul>
              </div>
            </Card>
            <Card title='Node Providers'>
              <div>
                <p className='inline'>Rolling with the best - </p>
                <span className='inline-block'> <TextLink text='Blockcypher' url='https://www.blockcypher.com/' underlined/></span>
                <p className='inline'>, </p>
                <span className='inline-block'><TextLink text='Hashcoin' url='https://www.haskoin.com/' underlined/></span>
                <p className='inline'>, </p>
                <span className='inline-block'><TextLink text='Bitgo' url='https://www.bitgo.com/' underlined/></span>
                <p className='inline'>, </p>
                <span className='inline-block'><TextLink text='SoChain' url='https://sochain.com/' underlined/></span>
                <p className='inline'>, </p>
                <span className='inline-block'><TextLink text='Covalent' url='https://www.covalent.xyz/' underlined/></span>
                <p className='inline'>, </p>
                <span className='inline-block'><TextLink text='Infura' url='https://www.infura.io/' underlined/></span>
                <p className='inline'>, </p>
                <span className='inline-block'><TextLink text='Alchemy' url='https://www.alchemy.com/' underlined/></span>
                <p className='inline'>, </p>
                <span className='inline-block'><TextLink text='Ark' url='https://ark.io/' underlined/></span>
                <p className='inline'>, </p>
                <span className='inline-block'><TextLink text='Routescan' url='https://routescan.io/documentation' underlined/></span>
                <p className='inline'> and more!</p>
              </div>
            </Card>
            <Card title='Block Explorers'>
              <div>
                <p className='inline'>Stay updated with </p>
                <span className='inline-block'> <TextLink text='Runescan' url='https://runescan.io/' underlined/></span>
                <p className='inline'>, </p>
                <span className='inline-block'> <TextLink text='Etherscan' url='https://etherscan.io/' underlined/></span>
                <p className='inline'>, </p>
                <span className='inline-block'><TextLink text='Snowtrace' url='https://snowtrace.dev/' underlined/></span>
                <p className='inline'>, </p>
                <span className='inline-block'><TextLink text='Blockchain.com' url='https://www.blockchain.com/en/' underlined/></span>
                <p className='inline'>, </p>
                <span className='inline-block'><TextLink text='Bscan' url='https://bscscan.com/' underlined/></span>
                <p className='inline'>, </p>
                <span className='inline-block'><TextLink text='Arbiscan' url='https://arbiscan.io/' underlined/></span>
                <p className='inline'> and the rest of the crew.</p>
              </div>
            </Card>
          </div>
        </div>
      </section>
      <section className='md:mb-20 mb-12 px-4 md:px-16 lg:px-64 flex flex-row justify-center'>
        <div className='flex flex-col'>
          <header className='flex flex-row justify-center'>
            <Subtitle text='Roadmap' />
          </header>
          <div className='mt-3 md:mt-6'>
            <ul className='list-disc list-inside'>
              <li>
                <strong>Xchainjs-aggregator:</strong> Enhancements to provide more robust cross-chain functionality and improved performance.
              </li>
              <li>
                <strong>Ledger Support:</strong> Integration for secure hardware wallet transactions, enhancing user security.
              </li>
              <li>
                <strong>Trezor Support:</strong> Implementing support for Trezor hardware wallets to diversify secure transaction options.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className='md:mb-20 mb-14 px-4 md:px-16 lg:px-64'>
        <div className='flex flex-col items-center'>
          <header className='flex flex-row justify-center'>
            <Subtitle text='Hop on the XchainJS train' iconClass={IconClass.UFO}/>
          </header>
          <p className='text-center mt-3 md:mt-6'>Ideas brewing? Feature request or a new integration on your mind? Do you want to know more?</p>
          <div className='flex flex-row mt-3 md:mt-8 gap-x-5 md:gap-x-12'>
            <ButtonLink url='https://discord.com/channels/838986635756044328/915384547670102037' text='Contact'/>
            <ButtonLink url='https://docs.xchainjs.org/' text='Documentation' style='secundary'/>
          </div>
        </div>
      </section>
    </main>
  )
}
