import React, { ChangeEvent, useContext, useState } from "react";
import IExpense from "../types/IExpense";
import { DataContext } from "../context/DataContext";
import { v4 as uuidv4 } from "uuid";
import IWeek from "../types/IWeek";

const ExpenseForm = () => {
  const { postExpense, onClearList, postWeek, expenses } =
    useContext(DataContext);
  const [expense, setExpense] = useState<IExpense>({
    amount: 0,
    description: "",
    id: uuidv4(),
  });

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postExpense(expense);
    setExpense({
      amount: 0,
      description: "",
      id: uuidv4(),
    });
  };

  const onSaveWeek = () => {
    const newWeek: IWeek = {
      date: new Date().toLocaleDateString(),
      expenses,
      id: uuidv4(),
    };
    postWeek(newWeek);
    onClearList();
  };

  const onUpdateExpense = (e: ChangeEvent<HTMLInputElement>) => {
    setExpense((prevExpense) => {
      const value =
        e.target.name === "amount" ? +e.target.value : e.target.value;
      return {
        ...prevExpense,
        [e.target.name]: value,
      };
    });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label className="d-flex flex-column my-2" htmlFor="">
        <span className="text-white">Amount:</span>
        <input
          onChange={onUpdateExpense}
          type="number"
          name="amount"
          className="rounded"
          value={expense.amount === 0 ? "" : expense.amount}
        />
      </label>
      <label className="d-flex flex-column my-2" htmlFor="">
        <span className="text-white">Description:</span>
        <input
          onChange={onUpdateExpense}
          type="text"
          name="description"
          className="rounded"
          value={expense.description}
        />
      </label>
      <button className="btn btn-secondary w-100 my-2">Enter</button>
      <button
        onClick={onSaveWeek}
        className="btn btn-success w-100 my-2"
        type="button"
      >
        Save Week
      </button>
      <button
        onClick={onClearList}
        className="btn btn-danger w-100 my-2"
        type="button"
      >
        Clear List
      </button>
    </form>
  );
};

export default ExpenseForm;
