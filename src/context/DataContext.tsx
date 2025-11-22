import { createContext, FC, ReactNode, useEffect, useState } from "react";
import IExpense from "../types/IExpense";

export const DataContext = createContext<{
  expenses: IExpense[];
  postExpense: (expense: IExpense) => void;
  fetchExpenses: () => void;
  deleteExpense: (id: string) => void;
  onClearList: () => void;
}>({
  expenses: [],
  postExpense: () => {},
  fetchExpenses: () => {},
  deleteExpense: () => {},
  onClearList: () => {},
});

interface Props {
  children: ReactNode;
}

const DataProvider: FC<Props> = ({ children }) => {
  const [expenses, setExpenses] = useState<IExpense[]>([]);

  const fetchExpenses = () => {
    const expensesString = localStorage.getItem("expenses");
    if (expensesString) {
      const allExpenses = JSON.parse(expensesString);
      setExpenses(allExpenses);
    } else {
      localStorage.setItem("expenses", JSON.stringify([]));
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
  }, []);

  useEffect(() => {
    console.log(expenses);
  }, [expenses]);

  return (
    <DataContext.Provider
      value={{
        expenses,
        postExpense,
        fetchExpenses,
        deleteExpense,
        onClearList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
