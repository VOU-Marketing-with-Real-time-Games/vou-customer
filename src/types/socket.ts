export type IConnectQuizSocket = {
  type: "CONNECT_QUIZ";
  userId: string;
  quizzId: string;
};

export type IAnswerSocketDone = {
  type: "ANSWER_COMPLETE";
  userId: string;
  quizzId: string;
};

export type IQuizRecevie = {
  id: number;
  quizzId: number;
  questionName: string;
  image: string | null;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
  explaination: string | null;
};
