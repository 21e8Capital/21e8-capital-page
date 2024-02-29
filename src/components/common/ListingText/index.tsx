import styles from "./styles.module.scss";

interface ListingTextProps {
  title: string;
  subtitle: string;
  data: Listing[];
}

const gradients = [
  {
    className: styles.gradient0,
    src: "/images/radial-gradient-0.webp",
  },
  {
    className: styles.gradient1,
    src: "/images/radial-gradient-2.webp",
  },
];

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

const ListingText = ({ data, title, subtitle }: ListingTextProps) => (
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
      src="/images/elipse-gradient.png"
      alt="Moon Gradient"
      className={`${styles.moonGradient} absolute`}
    />
    <img
      src="/images/elipse-gradient.png"
      alt="Moon Gradient"
      className={`${styles.moonGradientReverse} absolute`}
    />
    {circles.map((circle) => (
      <img
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

export default ListingText;
