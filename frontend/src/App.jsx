import { useEffect, useState } from "react";
import axios from "axios";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import FilterBar from "./components/FilterBar";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (category.trim()) {
        params.set("category", category.trim());
      }

      if (sort) {
        params.set("sort", sort);
      }

      const query = params.toString();
      const url = query ? `${API}/api/expenses?${query}` : `${API}/api/expenses`;

      const response = await axios.get(url);
      setExpenses(response.data);
    } catch (err) {
      setError("Could not load expenses");
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (category.trim()) {
        params.set("category", category.trim());
      }

      if (sort) {
        params.set("sort", sort);
      }

      const query = params.toString();
      const url = query
        ? `${API}/api/expenses?${query}`
        : `${API}/api/expenses`;

      const res = await axios.get(url);
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
      setError("Could not load expenses");
    } finally {
      setLoading(false);
    }
  };

  fetchExpenses();
}, [category, sort]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-semibold">Expense Tracker</h1>
        <p className="mt-2 text-sm text-gray-600">
          Add expenses, filter by category, and sort by date.
        </p>

        <div className="mt-6 grid gap-6">
          <ExpenseForm refresh={fetchExpenses} />
          <FilterBar
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
          />

          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <ExpenseList expenses={expenses} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;