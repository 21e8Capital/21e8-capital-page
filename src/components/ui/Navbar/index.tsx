import Link from "next/link";
import { Logo } from "@/svg";
import styles from "./styles.module.scss";
import { useState } from "react";
import { useContextState } from "@/utils/context";

const links = [
  {
    name: "Bitcoin",
    href: "/price-data/btc",
  },
  {
    name: "Layer1",
    href: "/price-data/layer-1",
  },
  {
    name: "defi",
    href: "/price-data/defi",
  },
];

const Navbar = () => {
  const { isBurgerActive, setIsBurgerActive, scrolling } = useContextState();

  return (
    <nav
      className={`${styles.wrapper} ${
        scrolling == "down" ? styles.down : styles.up
      }`}
    >
      <div className={styles.nav}>
        <div className={styles.innerNav}>
          <Link href="/" className={styles.logo}>
            <Logo name="21e8-logo" />
          </Link>
          <div
            className={styles.burgerWrapper}
            onClick={() => setIsBurgerActive(true)}
          >
            <img src="/images/burger.png" alt="menu" />
          </div>
          <ul className={styles.links}>
            {links.map(({ name, href }, index) => (
              <Link className={styles.link} key={index} href={href}>
                {name}
              </Link>
            ))}
          </ul>
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
            <Logo name="21e8-logo" />
            <img src="/images/x.png" alt="close" />
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
