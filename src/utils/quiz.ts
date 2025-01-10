export const convertAnswerCharToInt = (answerChar: string): number => {
  switch (answerChar) {
    case "A":
      return 0;
    case "B":
      return 1;
    case "C":
      return 2;
    case "D":
      return 3;
    default:
      return 5;
  }
};

export const convertAnswerIntToChar = (answerInt: number): string => {
  switch (answerInt) {
    case 0:
      return "A";
    case 1:
      return "B";
    case 2:
      return "C";
    case 3:
      return "D";
    default:
      return "";
  }
};
