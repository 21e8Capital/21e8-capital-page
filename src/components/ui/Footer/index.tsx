import { IconLink } from "@/components/common";
import styles from "./styles.module.scss";
import { GithubSVG, Logo, XSVG } from "@/svg";
import { socialCopy } from "@/copy";

const Footer = () => (
  <footer className={styles.footer}>
    <Logo />
    <div className={styles.socials}>
      <IconLink icon={<XSVG />} url={socialCopy.x} />
      <IconLink icon={<GithubSVG />} url={socialCopy.github} />
    </div>
  </footer>
);

export default Footer;
