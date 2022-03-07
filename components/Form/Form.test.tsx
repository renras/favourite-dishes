import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Form from "./Form";

test("form renders correctly", () => {
  render(<Form />);

  expect(screen.getByTestId("form")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("title")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("url of image")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("description")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("rating")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
});
