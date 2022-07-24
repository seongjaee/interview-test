export interface ITags {
  id: string;
  name: string;
}

export interface ICard {
  id: string;
  title: string;
  question: string;
  tags: ITags[];
}
