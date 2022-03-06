import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import GoBackButton from "./GoBackButton";

describe("go back function renders correctly and calls clickHandler on click", () => {
  const clickHandler = jest.fn();

  beforeEach(() => {
    render(<GoBackButton clickHandler={clickHandler} />);
  });

  test("go back button renders correctly", () => {
    expect(
      screen.getByRole("button", { name: /go back/i })
    ).toBeInTheDocument();
  });

  test("go back button calls clickHandler on click", () => {
    const button = screen.getByRole("button", { name: /go back/i });
    fireEvent.click(button);
    expect(clickHandler).toHaveBeenCalled();
  });
});
