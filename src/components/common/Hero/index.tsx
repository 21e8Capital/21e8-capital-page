import styles from "./styles.module.scss";

interface HeroProps {
  title: string;
  paragraphs: string[];
}

const Hero = ({ title, paragraphs }: HeroProps) => {
  return (
    <div className={styles.hero}>
      <h1>{title}</h1>
      {paragraphs.map((para, index) => (
        <p key={index}>{para}</p>
      ))}
    </div>
  );
};

export default Hero;
