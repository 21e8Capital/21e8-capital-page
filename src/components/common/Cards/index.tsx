import Card from "./Card";
import styles from "./styles.module.scss";

interface CardsProps {
  title: string;
  data: Listing[];
}

const Cards = ({ title, data }: CardsProps) => (
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
  </div>
);

export default Cards;
