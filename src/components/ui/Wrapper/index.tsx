import { useContextState } from "@/utils/context";
import styles from "./styles.module.scss";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  const { setIsBurgerActive } = useContextState();

  return (
    <main onClick={() => setIsBurgerActive(false)} className={styles.wrapper}>
      {children}
    </main>
  );
};

export default Wrapper;
