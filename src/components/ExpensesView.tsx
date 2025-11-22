import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

const ExpensesView = () => {
  const { expenses, deleteExpense } = useContext(DataContext);
  return (
    <div>
      <h2 className="">{`Expenses - ${expenses
        .map((expense) => expense.amount)
        .reduce((prev, curr) => prev + curr, 0)}`}</h2>
      <ul className="mx-0 px-0">
        {expenses &&
          expenses.map((expense) => (
            <li
              key={expense.id}
              className="d-flex my-3 mx-0 px-0 justify-content-between"
            >
              <p>{`${expense.description} - ${expense.amount}`}</p>
              <button onClick={() => deleteExpense(expense.id)}>x</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ExpensesView;
