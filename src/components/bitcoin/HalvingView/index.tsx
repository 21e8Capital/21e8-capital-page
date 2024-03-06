import { useTheme } from "next-themes";
import Skeleton from "react-loading-skeleton";
import { useContextState } from "@/utils/context";
import styles from "./styles.module.scss";

const HalvingView = () => {
  const { theme } = useTheme();
  const { halving } = useContextState();
  const { countdown, inflation, emission } = halving;

  const gradientImage =
    theme === "light"
      ? "/images/eclipse-gradient-light.webp"
      : "/images/eclipse-gradient-dark.png";

  return (
    <div className={styles.halving}>
      <h2>Halving Countdown</h2>
      <div className={styles.halvingGrid}>
        {countdown?.countdownTime ? (
          <h3>
            {countdown?.countdownTime?.slice(0, 2)}{" "}
            <span>
              Days <br />
              to go
            </span>
          </h3>
        ) : (
          <Skeleton width={240} height={100} />
        )}
        {emission?.currentEmission ? (
          <h3>
            {`${emission?.currentEmission}`}
            <span>Current Daily Emission</span>
          </h3>
        ) : (
          <Skeleton width={240} height={100} />
        )}
        {emission?.forecastedEmission ? (
          <h3>
            {`${emission?.forecastedEmission}`}
            <span>Next Daily Emission</span>
          </h3>
        ) : (
          <Skeleton width={240} height={100} />
        )}
        {countdown?.halveningDate ? (
          <h3>
            {countdown?.halveningDate?.day}{" "}
            <span>{countdown?.halveningDate?.restOfDate}</span>
          </h3>
        ) : (
          <Skeleton width={240} height={100} />
        )}
        {inflation?.currentInflationRate ? (
          <h3>
            {`${inflation?.currentInflationRate}%`}
            <span className={styles.smallTxt}>Current Inflation Rate</span>
          </h3>
        ) : (
          <Skeleton width={240} height={100} />
        )}
        {inflation?.nextInfationRate ? (
          <h3>
            {`${inflation?.nextInfationRate}%`}
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
