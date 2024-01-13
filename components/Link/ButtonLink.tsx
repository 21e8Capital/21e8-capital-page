import { clsx } from 'clsx'
interface Props {
  text: string
  url: string
  style?: 'primary' | 'secundary'
}

export function ButtonLink ({ text, url, style = 'primary' }: Props) {
  return (
    <a href={url} target='_blank' rel='noreferrer'
      className={clsx(
        'px-6 py-2 shadow-md',
        {
          'bg-primary hover:bg-primary-light text-white': style === 'primary',
          'bg-white border border-primary hover:border-primary-light text-primary hover:text-primary-light': style === 'secundary'
        }
      )}
    >
      <p>{text}</p>
    </a>
  )
}
