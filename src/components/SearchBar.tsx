interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: Props) => (
  <div className="w-full sm:max-w-sm">
    <label htmlFor="search" className="mb-1 block text-sm font-medium text-gray-700">
      Search
    </label>
    <input
      id="search"
      type="search"
      placeholder="Search by name…"
      className="w-full rounded-md border border-gray-300 px-3 py-2.5"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  </div>
);

export default SearchBar;
