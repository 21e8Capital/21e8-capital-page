import { useTheme } from "next-themes";
import Card from "./Card";
import styles from "./styles.module.scss";

interface CardsProps {
  title: string;
  data: Listing[];
}

const dots = [
  {
    className: styles.dots,
    src: "/images/dots.png",
  },
  {
    className: styles.dots2,
    src: "/images/dots-2.png",
  },
];

const Cards = ({ title, data }: CardsProps) => {
  const { theme } = useTheme();

  const gradients = [
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
    <div className={styles.container}>
      <div className={styles.cardsWrapper}>
        <h2>{title}</h2>
        <div className={styles.cards}>
          {data.slice(0, 2).map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
        <div className={styles.cardsSm}>
          {data.slice(2, data.length).map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
      {dots.map((dot, i) => (
        <img
          key={i}
          className={`${dot.className} absolute`}
          src={dot.src}
          alt="Stars"
        />
      ))}
      {gradients.map((gradient, i) => (
        <img
          key={i}
          className={`${gradient.className} absolute`}
          src={gradient.src}
          alt="Radial Gradient"
        />
      ))}
    </div>
  );
};

export default Cards;
