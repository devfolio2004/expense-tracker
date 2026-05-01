import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;
const storageKey = "expense-draft";
console.log("API:", API);
const createEmptyForm = () => ({
  amount: "",
  category: "",
  description: "",
  date: "",
  requestId: crypto.randomUUID()
});

export default function ExpenseForm({ refresh }) {
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : createEmptyForm();
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(form));
  }, [form]);

  const handleChange = (field) => (event) => {
    setForm((current) => ({
      ...current,
      [field]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
        await axios.post(`${API}/api/expenses`, form);
        setMessage("Expense saved");
        refresh();
    } catch (err) {
        console.error(err);
        setMessage("Error saving expense");
    }

    localStorage.removeItem(storageKey);
    setForm(createEmptyForm());
    setMessage("Expense saved");
    refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold">Add expense</h2>

      <div className="mt-4 grid gap-3">
        <input
          type="number"
          step="0.01"
          min="0.01"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange("amount")}
          className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-400"
        />

        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={handleChange("category")}
          className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-400"
        />

        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={handleChange("description")}
          className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-400"
        />

        <input
          type="date"
          value={form.date}
          onChange={handleChange("date")}
          className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-400"
        />

        <button
          type="submit"
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Save expense
        </button>

        {message ? <p className="text-sm text-green-600">{message}</p> : null}
      </div>
    </form>
  );
}