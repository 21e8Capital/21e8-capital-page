import Link from "next/link";
import styles from "./styles.module.scss";

interface Props {
  url: string;
  name: string;
  img?: string;
  description: string;
}

const IntegrationCard = ({ name, img, url, description }: Props) => (
  <div className={styles.wrapper}>
    <div className={styles.integrationCard}>
      <img src={img} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <Link href={url} target="_blank" rel="noopener noreferrer">
        <span>Learn More</span>
        <img src="/images/arrow.png" alt="Arrow" />
      </Link>
    </div>
  </div>
);

export default IntegrationCard;
