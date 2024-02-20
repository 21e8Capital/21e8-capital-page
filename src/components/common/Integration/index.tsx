import IntegrationCard from "./IntegrationCard";
import styles from "./styles.module.scss";

const Integration = ({ title, data }: SectionData) => (
  <div className={styles.integration}>
    <h2>{title}</h2>
    <div className={styles.list}>
      {data.map((asset, index) => (
        <IntegrationCard
          key={index}
          icon={asset.icon}
          name={asset.title}
          url={`${asset.url}`}
          description={asset.para}
        />
      ))}
    </div>
  </div>
);

export default Integration;
