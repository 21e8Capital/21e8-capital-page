import IconLink from "../Link/IconLink";

interface Props {
  url: string;
  name: string;
  icon?: JSX.Element;
  description: string;
}

const IntegrationCard = ({ name, icon, url, description }: Props) => (
  <div>
    <header className="flex flex-col">
      <div className="flex flex-row justify-center">
        {icon && <IconLink icon={icon} url={url} />}
      </div>
      <div className="flex flex-row justify-center mt-3">
        <a href={url} target="_blank" rel="noreferrer">
          <p className="font-bold text-lg md:text-2xl">{name.toUpperCase()}</p>
        </a>
      </div>
    </header>
    <p className="mt-4 md:mt-5 text-sm md:text-base">{description}</p>
  </div>
);

export default IntegrationCard;
