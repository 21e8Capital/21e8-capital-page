import { useContextState } from "@/utils/context";
import styles from "./styles.module.scss";

const HalvingView = () => {
  const { halving } = useContextState();
  const { countdown, inflation, emission } = halving;

  return (
    <div className={styles.halving}>
      <h2>Halving Countdown</h2>
      <div className={styles.halvingGrid}>
        <h3>
          {countdown?.countdownTime?.slice(0, 2)}{" "}
          <span>
            Days <br />
            to go
          </span>
        </h3>
        <h3>
          {countdown?.halveningDate?.day}{" "}
          <span>{countdown?.halveningDate?.restOfDate}</span>
        </h3>
        <h3 className={styles.small}>
          {`${inflation}%`}
          <span>Current Inflation Rate</span>
        </h3>
        <h3 className={styles.small}>
          {`${emission}%`}
          <span>Current Emission Rate</span>
        </h3>
      </div>
    </div>
  );
};

export default HalvingView;
