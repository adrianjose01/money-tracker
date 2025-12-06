import "bootstrap/dist/css/bootstrap.min.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpensesView from "./components/ExpensesView";
import WeeksView from "./components/WeeksView";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DataContext } from "./context/DataContext";
import IDataToExport from "./types/IDataToExport";
import { downloadFile } from "./utils/downloadHelper";
import { convertToCSV } from "./utils/csvConverter";

function App() {
  const [view, setView] = useState("Expenses");
  const { weeks } = useContext(DataContext);

  const onclickDownload = () => {
    withReactContent(Swal).fire({
      title: "Select file format",
      input: "select",
      inputOptions: {
        pdf: "pdf",
        csv: "csv",
        text: "text",
      },
      inputPlaceholder: "Select the format",
      preConfirm(inputValue) {
        const arrayToExport: IDataToExport[] = [];
        console.log(inputValue);
        weeks.forEach((week, idx) => {
          week.expenses.forEach((expense) => {
            arrayToExport.push({ ...expense, week: `week - ${idx + 1}` });
          });
        });
        downloadFile({
          data: convertToCSV(arrayToExport),
          fileName: "Expenses.csv",
          fileType: "text/csv",
        });
      },
    });
  };
  return (
    <div className="d-flex flex-column mx-4 justify-content-center align-items-center">
      <div className="container mt-5 pb-3 bg-dark rounded mx-3">
        <h1 className="text-center text-white my-3">Money Tracker</h1>
        <ExpenseForm />
      </div>
      <div className="container mt-3 pb-3 rounded mx-3">
        <div className="d-flex gap-4">
          <section
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
          </section>
          <section>
            <span className="link-dark" role="button" onClick={onclickDownload}>
              <i className="fa-solid fa-download fa-2x"></i>
            </span>
          </section>
        </div>
        {view === "Expenses" && <ExpensesView />}
        {view === "Weeks" && <WeeksView />}
      </div>
    </div>
  );
}

export default App;
