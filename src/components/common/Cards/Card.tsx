import styles from "./styles.module.scss";

interface CardProps {
  title: string;
  icon?: JSX.Element;
  para: string;
}

const Card = ({ title, icon, para }: CardProps) => (
  <div className={styles.card}>
    <div className="flex flex-row text-sm">
      {icon && <span>{icon}</span>}
      <p className={styles.title}>
        <b>{title}</b>
      </p>
    </div>
    <div className="flex flex-row text-sm">
      {icon && <div className="min-w-[20px] mr-2" />}
      <p className={styles.para}>{para}</p>
    </div>
  </div>
);

export default Card;
