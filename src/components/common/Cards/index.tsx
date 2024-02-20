import Card from "./Card";
import styles from "./styles.module.scss";

const Cards = ({ data }: Cards) => (
  <div className="my-5 md:my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6">
    {data.map((card, index) => (
      <Card key={index} {...card} />
    ))}
  </div>
);

export default Cards;
