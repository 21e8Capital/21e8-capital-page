import { type IconClass, Icon } from '../Icon'

interface Props {
  title: string
  iconClass?: IconClass
  children: JSX.Element
}

export function Card ({ title, iconClass, children }: Props) {
  return (
    <div className='flex flex-col pl-4 pt-2 pb-3 pr-1 md:pr-5 text-base border-2 border-primary shadow-xl bg-white'>
      <header className='flex flex-row pb-1 mb-1 md:mb-3 items-center'>
        {iconClass && <Icon iconClass={iconClass} className='mr-2 w-5 h-5' />}
        <p className='font-bold'>{title}</p>
      </header>
      <div className='flex flex-row text-sm'>
        { iconClass && <div className='min-w-[20px] mr-2'/>}
        {children}
      </div>
    </div>
  )
}
