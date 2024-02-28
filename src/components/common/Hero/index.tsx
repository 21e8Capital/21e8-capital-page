import styles from "./styles.module.scss";

interface HeroProps {
  span: string;
  title?: string;
  paragraphs: string[];
}

const gradients = [
  {
    className: styles.gradient0,
    src: "/images/radial-gradient-0.webp",
  },
  {
    className: styles.gradient1,
    src: "/images/radial-gradient-1.webp",
  },
  {
    className: styles.gradient2,
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

const Hero = ({ span, title, paragraphs }: HeroProps) => {
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
            src={circ.src}
            alt="Radial Gradient"
          />
        ))}
        <img
          className={`${styles.dots} absolute`}
          src="/images/dots.png"
          alt="Radial Gradient"
        />
      </div>
    </div>
  );
};

export default Hero;
