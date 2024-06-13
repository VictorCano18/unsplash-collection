import React from 'react';

interface SearchBarProps {
  onChange: (query: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange, onKeyDown }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      className="bg-white border-slate-100 shadow-md md:w-full w-9/12 h-16 p-5 rounded-md border-2 searchBarInputColor"
      type="text"
      placeholder="Enter your keywords..."
      onChange={handleChange}
      onKeyDown={onKeyDown}
    />
  );
}

export default SearchBar;