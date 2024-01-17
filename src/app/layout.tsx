import './globals.css'
import { type Metadata } from 'next'
import { logoPath, hero} from '../../copy/text';

export const metadata: Metadata = {
  title: `${hero.title}`,
  icons: [logoPath],
  description : `${hero.subtitle}`,
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
