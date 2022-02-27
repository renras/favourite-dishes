import React from "react";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const Search = ({ onChange, value }: Props) => {
  return (
    <>
      <input
        type="text"
        placeholder="Search.."
        onChange={(e) => onChange(e)}
        value={value || ""}
      />
    </>
  );
};

export default Search;
