import styles from "./styles.module.scss";

interface ListingTextProps {
  title: string;
  subtitle: string;
  textStart?: boolean;
  data: Listing[];
}

const ListingText = ({
  data,
  title,
  subtitle,
  textStart,
}: ListingTextProps) => (
  <div className={styles.listingText}>
    <h3>{title}</h3>
    <p className={textStart ? styles.textStart : ""}>{subtitle}</p>
    <br />
    <ul>
      {data.map(({ url, title, para }, index) => (
        <li key={index}>
          {url ? (
            <a href={url} target="_blank" rel="noreferrer">
              <strong>{title}:</strong>
            </a>
          ) : (
            <strong>{title}:</strong>
          )}{" "}
          {para}
        </li>
      ))}
    </ul>
  </div>
);

export default ListingText;
