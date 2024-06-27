import React from 'react';

interface SearchBarProps {
  onChange: (query: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  classNameProps: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange, onKeyDown, placeholder, classNameProps }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      className={classNameProps}
      type="text"
      placeholder={placeholder}
      onChange={handleChange}
      onKeyDown={onKeyDown}
    />
  );
}

export default SearchBar;