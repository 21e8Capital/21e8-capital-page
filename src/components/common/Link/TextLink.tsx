import { clsx } from "clsx";

interface Props {
  text: string;
  url: string;
  underlined?: boolean;
}

const TextLink = ({ text, url, underlined = false }: Props) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="text-primary hover:text-primary-light"
    >
      <p className={clsx({ underline: underlined })}>{text}</p>
    </a>
  );
};

export default TextLink;
