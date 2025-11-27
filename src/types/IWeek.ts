import IExpense from "./IExpense";

export default interface IWeek {
  expenses: IExpense[];
  date: string;
  id: string;
}
