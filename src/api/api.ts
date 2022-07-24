import { IPage } from "types";

const url = "https://my-notion-worker.seongjaee12.workers.dev/";

const queryDatabase = async () => {
  return await fetch(url);
};

export const getQuestionList = async () => {
  const data = await (await queryDatabase()).json();
  const questionList = data.results.map((page: any) => ({
    id: page.id,
    title: page.properties.Title.title[0]?.plain_text,
    tags: page.properties.Tags.multi_select.map((select: any) => ({
      id: select.id,
      name: select.name,
    })),
    question: page.properties.Question.rich_text[0]?.plain_text,
  }));
  return questionList;
};

export const createPage = async (payload: IPage) => {
  const init = {
    method: "POST",
    body: JSON.stringify(payload),
  };
  return await fetch(url, init);
};
