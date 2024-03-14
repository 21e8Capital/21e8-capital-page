import { useTheme } from "next-themes";
import styles from "./styles.module.scss";

interface HeroProps {
  span: string;
  title?: string;
  paragraphs: string[];
}

const circles = [
  {
    className: styles.ball0,
  },
  {
    className: styles.ball1,
  },
  {
    className: styles.ball2,
  },
];

const Hero = ({ span, title, paragraphs }: HeroProps) => {
  const { theme } = useTheme();

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
        theme === "light" ? "circle-gradient-small" : "radial-gradient-1"
      }.webp`,
    },
    {
      className: styles.gradient2,
      src: `/images/${
        theme === "light" ? "circle-gradient-small" : "radial-gradient-2"
      }.webp`,
    },
  ];

  return (
    <div className={styles.heroWrapper}>
      <div className={styles.hero}>
        <h1>
          <span>{span}</span> {title}
        </h1>
        <div className={styles.desc}>
          {paragraphs.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
        {gradients.map((grad, i) => (
          <img
            key={i}
            className={`${grad.className} absolute`}
            src={grad.src}
            alt="Radial Gradient"
          />
        ))}
        {circles.map((circ, i) => (
          <img
            key={i}
            className={`${circ.className} absolute`}
            src="/images/ball.png"
            alt="Circles"
          />
        ))}
        <img
          className={`${styles.dots} absolute`}
          src="/images/dots.png"
          alt="Stars"
        />
      </div>
    </div>
  );
};

export default Hero;
