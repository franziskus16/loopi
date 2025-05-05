const CategoryFilter = ({ categories, selected, onChange }) => (
  <div>
    <label htmlFor="category">
      <select
        id="category"
        value={selected}
        onChange={onChange}
        className="block w-full md:w-auto pr-10 px-3 py-3 mb-4 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-494 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">All categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </label>
  </div>
);

export default CategoryFilter;
