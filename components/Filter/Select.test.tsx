import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Select from "./Select";

describe("select renders correctly and calls onchange function on change", () => {
  const onChange = jest.fn();
  const options = ["one", "two", "three"];

  beforeEach(() => {
    render(<Select onChange={onChange} options={options} />);
  });

  test("select renders correctly", () => {
    expect(screen.getByLabelText(/sort list by rating/i)).toBeInTheDocument();
    expect(screen.getByTestId("select")).toBeInTheDocument();
    for (const option of options) {
      expect(screen.getByText(option)).toBeInTheDocument();
    }
  });

  test("select calls onchange function on change", () => {
    fireEvent.change(screen.getByTestId("select"), {
      target: { value: "two" },
    });

    expect(onChange).toHaveBeenCalled();
  });
});
