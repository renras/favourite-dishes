import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Search from "./Search";

describe("Search renders correctly and calls onchange function on change", () => {
  const onChange = jest.fn();

  beforeEach(() => {
    render(<Search onChange={onChange} />);
  });

  test("renders correctly", () => {
    const input = screen.getByPlaceholderText("Search..");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  // fire on change event and check if onChange function is called
  test("calls onChange function on change", () => {
    const input = screen.getByPlaceholderText("Search..");
    fireEvent.change(input, { target: { value: "test" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
