interface Props {
  text: string;
}

const Title = ({ text }: Props) => {
  return <p className="text-2xl md:text-4xl font-bold">{text}</p>;
};

export default Title;
