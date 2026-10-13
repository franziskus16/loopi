import { formatCategory } from "../utils/format";

interface Props {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
}

const CategoryFilter = ({ categories, selected, onChange }: Props) => (
  <div>
    <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700">
      Category
    </label>
    <select
      id="category"
      value={selected}
      onChange={(event) => onChange(event.target.value)}
      className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 sm:w-auto"
    >
      <option value="">All categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {formatCategory(category)}
        </option>
      ))}
    </select>
  </div>
);

export default CategoryFilter;
