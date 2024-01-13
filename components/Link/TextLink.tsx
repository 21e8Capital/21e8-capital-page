import { clsx } from 'clsx'

interface Props {
  text: string
  url: string
  underlined?: boolean
}

export function TextLink ({ text, url, underlined = false }: Props) {
  return (
    <a href={url} target='_blank' rel='noreferrer' className='text-primary hover:text-primary-light'>
      <p className={clsx({ underline: underlined })}>{text}</p>
    </a>
  )
}
