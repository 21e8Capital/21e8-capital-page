import {
  GithubIcon,
  XIcon,
  BitcoinIcon,
  EthIcon,
  RUNEIcon
} from './icons'

export enum IconClass {
  GITHUB,
  X,
  BTC,
  L1,
  DEFI
}

interface Props {
  iconClass: IconClass
  className?: string
}

export function Icon ({ iconClass, className }: Props) {
  if (iconClass === IconClass.GITHUB) return <GithubIcon className={className}></GithubIcon>
  if (iconClass === IconClass.X) return <XIcon className={className}></XIcon>
  if (iconClass === IconClass.BTC) return <BitcoinIcon className={className}></BitcoinIcon>
  if (iconClass === IconClass.L1) return <EthIcon className={className}></EthIcon>
  if (iconClass === IconClass.DEFI) return <RUNEIcon className={className}></RUNEIcon>

  return <></>
}
