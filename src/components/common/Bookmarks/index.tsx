import Link from "next/link";
import styles from "./styles.module.scss";

interface BookmarksProps {
  title: string;
  subtitle: string;
  data: Listing[];
}

const Bookmarks = ({ title, subtitle, data }: BookmarksProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bookmarks}>
        <h3>{title}</h3>
        <p className={styles.sub}>{subtitle}</p>
        <div className={styles.grid}>
          {data.map((item) => (
            <div className={styles.item}>
              <Link href={item.url!} target="_blank" rel="noopener noreferrer">
                <p>{item.title}</p>
                <span>{item.para}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
