import "bootstrap/dist/css/bootstrap.min.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpensesView from "./components/ExpensesView";
import WeeksView from "./components/WeeksView";
import { useState } from "react";

function App() {
  const [view, setView] = useState("Expenses");
  return (
    <div className="d-flex flex-column mx-4 justify-content-center align-items-center">
      <div className="container mt-5 pb-3 bg-dark rounded mx-3">
        <h1 className="text-center text-white my-3">Money Tracker</h1>
        <ExpenseForm />
      </div>
      <div className="container mt-3 pb-3 rounded mx-3">
        <div
          className="btn-group mb-3"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button
            onClick={() => setView("Expenses")}
            type="button"
            className="btn btn-secondary"
          >
            Expenses
          </button>
          <button
            onClick={() => setView("Weeks")}
            type="button"
            className="btn btn-primary"
          >
            Weeks
          </button>
        </div>
        {view === "Expenses" && <ExpensesView />}
        {view === "Weeks" && <WeeksView />}
      </div>
    </div>
  );
}

export default App;
