import { useTheme } from "next-themes";
import styles from "./styles.module.scss";

interface ListingTextProps {
  title: string;
  subtitle: string;
  data: Listing[];
}

const circles = [
  {
    className: styles.ball0,
    src: "/images/ball.png",
  },
  {
    className: styles.ball1,
    src: "/images/ball.png",
  },
  {
    className: styles.ball2,
    src: "/images/ball.png",
  },
];

const ListingText = ({ data, title, subtitle }: ListingTextProps) => {
  const { theme } = useTheme();
  const gradientImage =
    theme === "light"
      ? "/images/eclipse-gradient-light.webp"
      : "/images/eclipse-gradient-dark.png";

  const gradients = [
    {
      className: styles.gradient0,
      src: `/images/${
        theme === "light" ? "circle-gradient-small" : "radial-gradient-0"
      }.webp`,
    },
    {
      className: styles.gradient1,
      src: `/images/${
        theme === "light" ? "circle-gradient-small" : "radial-gradient-2"
      }.webp`,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.listingText}>
        <h3>{title}</h3>
        <p className={styles.sub}>{subtitle}</p>
        <ul className={styles.gridContainer}>
          {data.map(({ url, title, para }, index) => (
            <li className={styles.textWrapper} key={index}>
              <div className={styles.text}>
                <h4>{title}</h4>
                <p>{para}</p>
                <div className={styles.radialGradientTop}></div>
                <div className={styles.radialGradientBottom}></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <img
        src={gradientImage}
        alt="Moon Gradient"
        className={`${styles.moonGradient} absolute`}
      />
      <img
        src={gradientImage}
        alt="Moon Gradient"
        className={`${styles.moonGradientReverse} absolute`}
      />
      {circles.map((circle, i) => (
        <img
          key={i}
          src={circle.src}
          alt="Circle"
          className={`${circle.className} absolute`}
        />
      ))}
      {gradients.map((grad, i) => (
        <img
          key={i}
          className={`${grad.className} absolute`}
          src={grad.src}
          alt="Radial Gradient"
        />
      ))}
    </div>
  );
};

export default ListingText;
