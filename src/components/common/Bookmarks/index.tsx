import Link from "next/link";
import styles from "./styles.module.scss";

interface BookmarksProps {
  title: string;
  subtitle: string;
  data: Listing[];
}

const gradients = [
  {
    className: styles.gradient0,
    src: "/images/radial-gradient-0.webp",
  },
  {
    className: styles.gradient1,
    src: "/images/radial-gradient-1.webp",
  },
];

const circles = [
  {
    className: styles.ball0,
    src: "/images/ball.png",
  },
  {
    className: styles.ball1,
    src: "/images/ball.png",
  },
];

const Bookmarks = ({ title, subtitle, data }: BookmarksProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bookmarks}>
        <h3>{title}</h3>
        <p className={styles.sub}>{subtitle}</p>
        <div className={styles.grid}>
          {data.map((item, i) => (
            <div className={styles.item} key={i}>
              <Link href={item.url!} target="_blank" rel="noopener noreferrer">
                <p>{item.title}</p>
                <span>{item.para}</span>
              </Link>
            </div>
          ))}
        </div>
        {gradients.map((grad, i) => (
          <img
            key={i}
            className={`${grad.className} absolute`}
            src={grad.src}
            alt="Radial Gradient"
          />
        ))}
        {circles.map((circ, i) => (
          <img
            key={i}
            className={`${circ.className} absolute`}
            src={circ.src}
            alt="Circles"
          />
        ))}
        <img
          className={`${styles.dots} absolute`}
          src="/images/dots.png"
          alt="Stars"
        />
        <img
          className={`${styles.dots1} absolute`}
          src="/images/dots.png"
          alt="Stars"
        />
      </div>
    </div>
  );
};

export default Bookmarks;
