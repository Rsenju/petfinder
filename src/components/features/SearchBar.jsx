const SearchBar = ({ value, onChange }) => {
    return (
      <input
        type="text"
        placeholder="Buscar ONG..."
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="border p-2 rounded w-full"
      />
    );
  };
  
  export default SearchBar;