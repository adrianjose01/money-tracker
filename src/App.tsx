import "bootstrap/dist/css/bootstrap.min.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpensesView from "./components/ExpensesView";

function App() {
  return (
    <div className="d-flex flex-column mx-4 justify-content-center align-items-center">
      <div className="container mt-5 pb-3 bg-dark rounded mx-3">
        <h1 className="text-center text-white my-3">Money Tracker</h1>
        <ExpenseForm />
      </div>
      <div className="container mt-3 pb-3 rounded mx-3">
        <ExpensesView />
      </div>
    </div>
  );
}

export default App;
