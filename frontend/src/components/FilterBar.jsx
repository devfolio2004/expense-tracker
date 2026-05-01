export default function FilterBar({ category, setCategory, sort, setSort }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold">Filters</h2>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <input
          type="text"
          placeholder="Filter by category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-400"
        />

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="w-full rounded-lg border px-3 py-2 outline-none focus:border-gray-400"
        >
          <option value="">No sort</option>
          <option value="date_desc">Date: newest first</option>
        </select>
      </div>
    </div>
  );
}