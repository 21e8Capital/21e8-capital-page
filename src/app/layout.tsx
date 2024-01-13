import './globals.css'
import Image from 'next/image'
import { IconLink, Title } from '@components'
import { type Metadata } from 'next'
import { IconClass } from '../../components/Icon/Icon'

import {logoAlt, logoPath, hero, social} from '../../copy/text'

export const metadata: Metadata = {
  title: '21e8 Capital',
  icons: [logoPath]
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={` text-primary 2xl:px-60 antialiased`}>

        <header className='flex flex-col mt-5 md:mt-10 mb-10 md:mb-16'>
          <div className='hidden md:flex flex-row justify-center'>
            <Image className='text-center' src={logoPath} width={110} height={110} alt={logoAlt}/>
          </div>
          <div className='flex md:hidden flex-row justify-center'>
            <Image className='text-center' src={logoPath} width={70} height={70} alt={logoAlt}/>
          </div>
          <div className='flex flex-row justify-center mt-0 md:mt-3'>
            <Title text={hero.title}/>
          </div>
        </header>

        {children}

        <footer className='flex flex-col mb-20 md:mb-40 text-center gap-y-7 md:gap-y-10'>
          <strong>Follow 21e8 Capital</strong>
          <div className='flex flex-row justify-center items-center gap-x-8 md:gap-x-20 '>
            <IconLink iconClass={IconClass.X} url={social.x}/>
            <IconLink iconClass={IconClass.GITHUB} url={social.github}/>
          </div>
        </footer>
        
      </body>
    </html>
  )
}
