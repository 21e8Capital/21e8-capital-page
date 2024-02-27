import { useContextState } from "@/utils/context";
import styles from "./styles.module.scss";

const HalvingView = () => {
  const { halving } = useContextState();
  const { countdownTime, halveningDate } = halving;

  return (
    <div className={styles.halving}>
      <h2>Halving Countdown</h2>
      <div className={styles.halvingGrid}>
        <h3>
          {countdownTime?.slice(0, 2)}{" "}
          <span>
            Days <br />
            to go
          </span>
        </h3>
        <h3>
          {halveningDate?.day} <span>{halveningDate?.restOfDate}</span>
        </h3>
        <h3></h3>
        <h3></h3>
      </div>
    </div>
  );
};

export default HalvingView;
