import { useContextState } from "@/utils/context";
import styles from "./styles.module.scss";

interface WrapperProps {
  className: string;
  children: React.ReactNode;
}

const Wrapper = ({ children, className }: WrapperProps) => {
  const { setIsBurgerActive } = useContextState();

  return (
    <main
      onClick={() => setIsBurgerActive(false)}
      className={`${styles.wrapper} ${className}`}
    >
      {children}
    </main>
  );
};

export default Wrapper;
