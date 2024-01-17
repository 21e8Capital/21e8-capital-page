import { Icon, type IconClass } from '../Icon'

interface Props {
  iconClass: IconClass
  url: string
}

export function IconLink ({ iconClass, url }: Props) {
  return (
    <a href={url} target='_blank' rel='noreferrer'>
      <Icon iconClass={iconClass} className='text-primary hover:text-primary-light h-8 w-8 md:h-12 md:w-12 lg:h-16 lg:w-16'/>
    </a>
  )
}
