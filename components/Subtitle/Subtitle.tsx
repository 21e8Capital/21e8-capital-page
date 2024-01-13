import { clsx } from 'clsx'
import { Icon, type IconClass } from '../Icon'

type Size = 'base' | 'lg'
interface Props {
  text: string
  size?: Size
  iconClass?: IconClass
}

export function Subtitle ({ text, size = 'base', iconClass }: Props) {
  return (
    <div className={` flex flex-row items-center`}>
      {
        iconClass && (
          <div className='flex justify-center md:mr-5 mr-3'>
            <Icon iconClass={iconClass}
              className={clsx({
                'w-6 md:w-7 h-6 md:h-7': size === 'base',
                'w-7 md:w-8 h-7 md:h-8': size === 'lg'
              })}/>
          </div>
        )
      }
      <p
        className={clsx(
          'whitespace-pre',
          {
            'text-xl md:text-4xl': size === 'base',
            'text-2xl md:text-[44px]': size === 'lg'
          }
        )}
      >
        {text.replaceAll(' ', '  ')}
      </p>
      {
        iconClass && (
          <div className='flex justify-center md:ml-5 ml-3'>
            <Icon iconClass={iconClass}
              className={clsx({
                'w-6 md:w-7 h-6 md:h-7': size === 'base',
                'w-7 md:w-8 h-7 md:h-8': size === 'lg'
              })}/>
          </div>
        )
      }
    </div>
  )
}
