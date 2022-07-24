export const queryDatabase = async () => {
  return await fetch("https://my-notion-worker.seongjaee12.workers.dev/");
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
