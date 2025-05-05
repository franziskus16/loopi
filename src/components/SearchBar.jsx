const SearchBar = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search by name..."
    className="border p-2 rounded w-full max-w-md mb-4"
    value={value}
    onChange={onChange}
  />
);

export default SearchBar;
