import Link from "next/link";
import { Burger, Logo } from "@/svg";
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
  const { isBurgerActive, setIsBurgerActive } = useContextState();

  return (
    <nav className={styles.naw}>
      <div className={styles.innerNav}>
        <Link href="/" className={styles.logo}>
          <Logo />
        </Link>
        <div
          className={styles.burgerWrapper}
          onClick={() => setIsBurgerActive(true)}
        >
          <Burger />
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
          className={styles.logo}
        >
          <Logo />
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
    </nav>
  );
};

export default Navbar;
