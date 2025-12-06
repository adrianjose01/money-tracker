import { FC, useState } from "react";
import IWeek from "../types/IWeek";

interface Props {
  week: IWeek;
  deleteWeek: (id: string) => void;
}

const Week: FC<Props> = ({ week, deleteWeek }) => {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <div className="alert alert-secondary " role="alert">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <div>
            <p className="m-0">{week.date}</p>
            <p className="m-0 fs-4">
              {`RD$${week.expenses
                .map((expense) => expense.amount)
                .reduce((prev, curr) => prev + curr, 0)}`}
            </p>
            <button
              className="btn btn-success"
              onClick={() => setShowSummary((prev) => !prev)}
            >
              Summary
            </button>
          </div>
        </div>
        <div>
          <span
            role="button"
            className="d-block"
            onClick={() => deleteWeek(week.id)}
          >
            <i className="fa-solid fa-trash fa-2x link-danger"></i>
          </span>
        </div>
      </div>
      {showSummary &&
        week.expenses.map((expense) => (
          <li
            key={expense.id}
            className="d-flex mx-0 px-0 justify-content-between"
          >
            <p className="m-1">{`${expense.description} - ${expense.amount}`}</p>
          </li>
        ))}
    </div>
  );
};

export default Week;
