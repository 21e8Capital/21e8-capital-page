import { ReactNode, useState } from "react";
import styles from "./styles.module.scss";

const Hoverable = ({
  children,
  content,
}: {
  children: ReactNode;
  content: ReactNode;
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => setShowPopup(true);
  const handleMouseLeave = () => setShowPopup(false);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div
      className={styles.hoverableWrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.hoverInit}>{children}</div>
      {showPopup && (
        <div
          className={styles.hoverable}
          style={{
            top: mousePosition.y + 5,
            left: mousePosition.x + 20,
            zIndex: 1000,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Hoverable;
