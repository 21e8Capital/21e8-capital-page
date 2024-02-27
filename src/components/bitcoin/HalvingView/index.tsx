import Skeleton from "react-loading-skeleton";
import { useContextState } from "@/utils/context";
import styles from "./styles.module.scss";

const HalvingView = () => {
  const { halving } = useContextState();
  const { countdown, inflation, emission } = halving;

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
        {countdown?.halveningDate ? (
          <h3>
            {countdown?.halveningDate?.day}{" "}
            <span>{countdown?.halveningDate?.restOfDate}</span>
          </h3>
        ) : (
          <Skeleton width={240} height={100} />
        )}
        {inflation ? (
          <h3 className={styles.small}>
            {`${inflation}%`}
            <span>Current Inflation Rate</span>
          </h3>
        ) : (
          <Skeleton width={240} height={100} />
        )}
        {emission ? (
          <h3 className={styles.small}>
            {`${emission}%`}
            <span>Current Emission Rate</span>
          </h3>
        ) : (
          <Skeleton width={240} height={100} />
        )}
      </div>
    </div>
  );
};

export default HalvingView;
