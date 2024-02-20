import { IconLink } from "@/components/common";
import styles from "./styles.module.scss";
import { GithubSVG, XSVG } from "@/svg";
import { social } from "@/copy/text";

const Footer = () => (
  <footer
    className={`${styles.footer} flex flex-col mt-5 md:mt-20 mb-20 md:mb-20 text-center gap-y-7 md:gap-y-10`}
  >
    <strong>{social.title}</strong>
    <div className="flex flex-row justify-center items-center gap-x-8 md:gap-x-20 ">
      <IconLink icon={<XSVG />} url={social.x} />
      <IconLink icon={<GithubSVG />} url={social.github} />
    </div>
  </footer>
);

export default Footer;
