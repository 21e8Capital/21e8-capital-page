interface Card {
  icon?: JSX.Element;
  title: string;
  para: string;
}

interface Cards {
  data: Card[];
}

interface Bookmark {
  title: string;
  para: strong;
  url: string;
}
