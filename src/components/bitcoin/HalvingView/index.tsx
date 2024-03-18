import { useTheme } from "next-themes";
import Skeleton from "react-loading-skeleton";
import { useContextState } from "@/utils/context";
import styles from "./styles.module.scss";

const HalvingView = () => {
  const { theme } = useTheme();
  const { halving } = useContextState();

  const gradientImage =
    theme === "light"
      ? "/images/eclipse-gradient-light.webp"
      : "/images/eclipse-gradient-dark.png";

  return (
    <div className={styles.halving}>
      <h2>Halving Countdown</h2>
      <div className={styles.halvingGrid}>
        {halving?.countdown?.countdownTime ? (
          <h3>
            {halving?.countdown?.countdownTime?.slice(0, 2)}{" "}
            <span>
              Days <br />
              to go
            </span>
          </h3>
        ) : (
          <Skeleton width={240} height={100} />
        )}
        {halving?.emission?.currentEmission ? (
          <h3>
            {`${halving?.emission?.currentEmission}`}
            <span>Current Daily Emission</span>
          </h3>
        ) : (
          <Skeleton width={240} height={100} />
        )}
        {halving?.emission?.forecastedEmission ? (
          <h3>
            {`${halving?.emission?.forecastedEmission}`}
            <span>Next Daily Emission</span>
          </h3>
        ) : (
          <Skeleton width={240} height={100} />
        )}
        {halving?.countdown?.halveningDate ? (
          <h3>
            {halving?.countdown?.halveningDate?.day}{" "}
            <span>{halving?.countdown?.halveningDate?.restOfDate}</span>
          </h3>
        ) : (
          <Skeleton width={240} height={100} />
        )}
        {halving?.inflation?.currentInflationRate ? (
          <h3>
            {`${halving?.inflation?.currentInflationRate}%`}
            <span className={styles.smallTxt}>Current Inflation Rate</span>
          </h3>
        ) : (
          <Skeleton width={240} height={100} />
        )}
        {halving?.inflation?.nextInfationRate ? (
          <h3>
            {`${halving?.inflation?.nextInfationRate}%`}
            <span className={styles.smallTxt}>Next Inflation Rate</span>
          </h3>
        ) : (
          <Skeleton width={240} height={100} />
        )}
        <img
          src={gradientImage}
          alt="Moon Gradient"
          className={`${styles.moonGradient} absolute`}
        />
      </div>
    </div>
  );
};

export default HalvingView;
