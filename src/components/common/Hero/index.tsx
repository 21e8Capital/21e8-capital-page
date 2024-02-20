import Subtitle from "../Subtitle";
import styles from "./styles.module.scss";

interface HeroProps {
  title: string;
  paragraphs: string[];
}

const Hero = ({ title, paragraphs }: HeroProps) => {
  return (
    <div className={styles.hero}>
      <Subtitle text={title} size="lg" />
      {paragraphs.map((para, index) => (
        <p key={index} className="text-center my-5 md:my-8 text-sm md:text-lg">
          {para}
        </p>
      ))}
    </div>
  );
};

export default Hero;
