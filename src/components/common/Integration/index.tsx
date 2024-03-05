import { useTheme } from "next-themes";
import IntegrationCard from "./IntegrationCard";
import styles from "./styles.module.scss";

const Integration = ({ title, data }: SectionData) => {
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
        theme === "light" ? "circle-gradient-small" : "radial-gradient-2"
      }.webp`,
    },
  ];

  return (
    <div className={styles.wrapperInt}>
      <div className={styles.integration}>
        <h2>{title}</h2>
        <div className={styles.list}>
          {data.map((asset, index) => (
            <IntegrationCard
              key={index}
              img={asset.img}
              name={asset.title}
              url={`${asset.url}`}
              description={asset.para}
            />
          ))}
        </div>
      </div>
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
};

export default Integration;
