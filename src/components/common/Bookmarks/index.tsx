import Subtitle from "../Subtitle";
import styles from "./styles.module.scss";

interface BookmarksProps {
  title: string;
  subtitle: string;
  data: Bookmark[];
}

const Bookmarks = ({ title, subtitle, data }: BookmarksProps) => {
  return (
    <div className={styles.bookmarks}>
      <header className="flex flex-row justify-center">
        <Subtitle text={title} />
      </header>
      <p className="text-center my-5 md:my-8">{subtitle}</p>
      <ul className="list-disc list-inside">
        {data.map(({ url, title, para }) => (
          <li>
            <a href={url} target="_blank" rel="noreferrer">
              <u>
                <strong>{title}:</strong>
              </u>
            </a>{" "}
            {para}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookmarks;
