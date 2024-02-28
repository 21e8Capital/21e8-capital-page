import styles from "./styles.module.scss";

interface CardProps {
  title: string;
  icon?: JSX.Element;
  para: string;
  img?: string;
}

const Card = ({ title, para, img }: CardProps) => (
  <div className={styles.cardWrapper}>
    <div className={styles.card}>
      <div className={styles.lhs}>
        <h3>{title}</h3>
        <p>{para}</p>
      </div>
      <img src={img} alt={title} />
      <div className={styles.radialGradientTop}></div>
      <div className={styles.radialGradientBottom}></div>
    </div>
  </div>
);

export default Card;
