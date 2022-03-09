interface Props {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  name?: string;
}

const Select = ({ onChange, options, name = "" }: Props) => {
  return (
    <select name={name} id={name} onChange={onChange}>
      <option hidden></option>
      {options.map((options, index) => {
        return <option key={index}>{options}</option>;
      })}
    </select>
  );
};

export default Select;
