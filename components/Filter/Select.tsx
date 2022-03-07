import React from "react";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

const Filter = ({ onChange, options }: Props) => {
  return (
    <div>
      <label htmlFor="rating">Sort list by rating:</label>
      <select
        data-testid="select"
        name="rating"
        id="rating"
        onChange={(e) => onChange(e)}
      >
        <option hidden></option>
        {options.map((value: string, index: number) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
