import { clsx } from "clsx";

type Size = "base" | "lg";
interface Props {
  text: string;
  size?: Size;
  icon?: JSX.Element;
}

const Subtitle = ({ text, size = "base", icon }: Props) => {
  return (
    <div className={` flex flex-row items-center`}>
      {icon && <div className="flex justify-center md:mr-5 mr-3">{icon}</div>}
      <p
        className={clsx("whitespace-pre", {
          "text-xl md:text-4xl": size === "base",
          "text-2xl md:text-[44px]": size === "lg",
        })}
      >
        {text.replaceAll(" ", "  ")}
      </p>
      {icon && <div className="flex justify-center md:ml-5 ml-3">{icon}</div>}
    </div>
  );
};

export default Subtitle;
