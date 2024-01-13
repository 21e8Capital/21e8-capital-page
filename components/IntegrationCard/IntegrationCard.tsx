import { IconLink } from '../Link'
import { type IconClass } from '../Icon'

interface Props {
  iconClass: IconClass
  name: string
  description: string
  url: string
}

export function IntegrationCard ({ name, iconClass, url, description }: Props) {
  return (
    <div>
      <header className='flex flex-col'>
        <div className='flex flex-row justify-center'>
          <IconLink iconClass={iconClass} url={url}/>
        </div>
        <div className='flex flex-row justify-center mt-3'>
          <p className='font-bold text-lg md:text-2xl'>{name.toUpperCase()}</p>
        </div>
      </header>
      <p className='mt-4 md:mt-5 text-sm md:text-base'>{description}</p>
    </div>
  )
}
