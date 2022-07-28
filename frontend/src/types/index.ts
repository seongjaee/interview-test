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

export interface IPage {
  Title: { title: { text: { content: string } }[] };
  Question: { rich_text: { text: { content: string } }[] };
  Tags: { multi_select: { name: string }[] };
}
