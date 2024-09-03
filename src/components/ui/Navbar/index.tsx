import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import { useContextState } from "@/utils/context";
import { Logo } from "@/svg";
import styles from "./styles.module.scss";

const links = [
  {
    name: "Bitcoin",
    href: "bitcoin",
  },
  {
    name: "Layer1",
    href: "layer-1",
  },
  {
    name: "defi",
    href: "defi",
  },
  // {
  //   name: "fund assets",
  //   href: "fund-assets",
  // },
];

const Navbar = () => {
  const { isBurgerActive, setIsBurgerActive, scrolling } = useContextState();

  return (
    <nav className={`${styles.wrapper}`}>
      <div className={styles.nav}>
        <div className={styles.innerNav}>
          <Link href="/" className={styles.logo}>
            <Logo />
          </Link>
          <div
            className={styles.burgerWrapper}
            onClick={() => setIsBurgerActive(true)}
          >
            <img src="/images/burger.png" alt="menu" />
          </div>
          <div className={styles.rhs}>
            <ul className={styles.links}>
              {links.map(({ name, href }, index) => (
                <Link className={styles.link} key={index} href={`/${href}`}>
                  {name}
                </Link>
              ))}
            </ul>
            <ThemeSwitcher />
          </div>
        </div>
        <ul
          className={`${styles.mobileLinks} ${
            isBurgerActive && styles.mobileLinksActive
          }`}
        >
          <Link
            onClick={() => setIsBurgerActive(false)}
            href="/"
            className={styles.logoWrapper}
          >
            <Logo />
            <img src="/images/x.png" alt="close" className={styles.close} />
          </Link>
          {links.map(({ name, href }, index) => (
            <Link
              onClick={() => setIsBurgerActive(false)}
              className={styles.link}
              key={index}
              href={href}
            >
              {name}
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
