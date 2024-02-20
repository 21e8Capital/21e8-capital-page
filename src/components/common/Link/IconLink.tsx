interface Props {
  icon: JSX.Element;
  url: string;
}

const IconLink = ({ icon, url }: Props) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <span>{icon}</span>
    </a>
  );
};

export default IconLink;
