interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ onChange }: Props) => {
  return <input type="text" placeholder="Search.." onChange={onChange} />;
};

export default Search;
