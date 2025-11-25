import { createContext, FC, ReactNode, useEffect, useState } from "react";
import IExpense from "../types/IExpense";
import IWeek from "../types/IWeek";

export const DataContext = createContext<{
  expenses: IExpense[];
  postExpense: (expense: IExpense) => void;
  fetchExpenses: () => void;
  deleteExpense: (id: string) => void;
  onClearList: () => void;
  weeks: IWeek[];
  postWeek: (week: IWeek) => void;
}>({
  expenses: [],
  postExpense: () => {},
  fetchExpenses: () => {},
  deleteExpense: () => {},
  onClearList: () => {},
  weeks: [],
  postWeek: () => {},
});

interface Props {
  children: ReactNode;
}

const DataProvider: FC<Props> = ({ children }) => {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [weeks, setWeeks] = useState<IWeek[]>([]);

  const fetchExpenses = () => {
    const expensesString = localStorage.getItem("expenses");
    if (expensesString) {
      const allExpenses = JSON.parse(expensesString);
      setExpenses(allExpenses);
    } else {
      localStorage.setItem("expenses", JSON.stringify([]));
    }
  };

  const fetchWeeks = () => {
    const weeksString = localStorage.getItem("weeks");
    if (weeksString) {
      const allWeeks = JSON.parse(weeksString);
      setWeeks(allWeeks);
    } else {
      localStorage.setItem("weeks", JSON.stringify([]));
    }
  };

  const postExpense = (expense: IExpense) => {
    if (!expense.description || !expense.amount) {
      return alert("Neither values can be empty");
    }
    setExpenses((prevExpenses) => {
      localStorage.setItem(
        "expenses",
        JSON.stringify([...prevExpenses, expense])
      );
      return [...prevExpenses, expense];
    });
  };

  const postWeek = (week: IWeek) => {
    if (week.expenses.length < 1) {
      return alert("weeks values can be empty");
    }
    setWeeks((prevWeeks) => {
      localStorage.setItem("weeks", JSON.stringify([...prevWeeks, week]));
      return [...prevWeeks, week];
    });
  };

  const deleteExpense = (id: string) => {
    setExpenses((prevExpenses) => {
      const newExpenses = prevExpenses.filter((expense) => expense.id !== id);
      localStorage.setItem("expenses", JSON.stringify(newExpenses));
      return newExpenses;
    });
  };

  const onClearList = () => {
    localStorage.removeItem("expenses");
    setExpenses([]);
  };

  useEffect(() => {
    fetchExpenses();
    fetchWeeks();
  }, []);

  return (
    <DataContext.Provider
      value={{
        expenses,
        postExpense,
        fetchExpenses,
        deleteExpense,
        onClearList,
        weeks,
        postWeek,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
