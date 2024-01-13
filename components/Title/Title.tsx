interface Props {
  text: string
}

export function Title ({ text }: Props) {
  return (
    <p className='text-2xl md:text-4xl font-bold'>{text}</p>
  )
}
