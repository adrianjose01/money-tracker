import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

const WeeksView = () => {
  const { weeks, deleteWeek } = useContext(DataContext);
  return (
    <div>
      {weeks &&
        weeks.map((week) => (
          <div className="alert alert-secondary" role="alert">
            <p className="m-0">{week.date}</p>
            <p className="m-0 fs-4">
              {`RD$${week.expenses
                .map((expense) => expense.amount)
                .reduce((prev, curr) => prev + curr, 0)}`}
            </p>
            <button
              className="btn btn-danger"
              onClick={() => deleteWeek(week.id)}
            >
              delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default WeeksView;
