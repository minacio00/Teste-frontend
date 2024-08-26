"use client";

interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
  return (
    <input 
      type="text" 
      placeholder={placeholder} 
      className="border p-2 rounded w-1/3" 
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
