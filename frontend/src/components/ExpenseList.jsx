const formatMoney = (amount) => Number(amount).toFixed(2);

export default function ExpenseList({ expenses, loading }) {
  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">Expenses</h2>
        <p className="text-sm font-medium text-gray-700">
          Total: ₹{formatMoney(total)}
        </p>
      </div>

      {loading ? (
        <p className="mt-4 text-sm text-gray-600">Loading...</p>
      ) : expenses.length === 0 ? (
        <p className="mt-4 text-sm text-gray-600">No expenses found.</p>
      ) : (
        <div className="mt-4 overflow-hidden rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2">Amount</th>
                <th className="px-3 py-2">Category</th>
                <th className="px-3 py-2">Description</th>
                <th className="px-3 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense._id} className="border-t">
                  <td className="px-3 py-2">₹{formatMoney(expense.amount)}</td>
                  <td className="px-3 py-2">{expense.category}</td>
                  <td className="px-3 py-2">{expense.description || "-"}</td>
                  <td className="px-3 py-2">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}