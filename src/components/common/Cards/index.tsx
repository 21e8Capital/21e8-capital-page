import Card from "./Card";
import styles from "./styles.module.scss";

interface CardsProps {
  title: string;
  data: Listing[];
}

const Cards = ({ title, data }: CardsProps) => (
  <div className={styles.cardsWrapper}>
    <h2>{title}</h2>
    <div className={styles.cards}>
      {data.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  </div>
);

export default Cards;
