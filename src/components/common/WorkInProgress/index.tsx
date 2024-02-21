import { WIP } from "@/svg";
import styles from "./styles.module.scss";

const WorkInProgress = () => {
  return (
    <div className={styles.wip}>
      <h2>Coming soon...</h2>
      <WIP />
    </div>
  );
};

export default WorkInProgress;
