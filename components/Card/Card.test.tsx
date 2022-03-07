import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Card from "./Card";

const dish = {
  name: "Pizza",
  image:
    "https://www.pexels.com/photo/man-feeding-pizza-to-another-man-4670215/",
  description: "This is a pizza",
  rating: 5,
  placeholder: "",
};

test("card is rendered correctly", () => {
  render(<Card {...dish} />);

  expect(screen.getByRole("heading", { name: /pizza/i })).toBeInTheDocument();
  expect(screen.getByText(/this is a pizza/i)).toBeInTheDocument();
  expect(screen.getByText(/5/)).toBeInTheDocument();
  expect(screen.getByAltText(/pizza/i)).toBeInTheDocument();
});

describe("image gets to full screen when clicked and display go back button", () => {
  beforeEach(() => {
    render(<Card {...dish} />);
  });

  test("image is not full screen at first render", () => {
    const img = screen.getByTestId("img-wrapper");

    expect(img).not.toHaveStyle({
      width: "100%",
      height: "100%",
    });
  });

  test("image resize to full screen when clicked and displays go back button", async () => {
    const img = screen.getByTestId("img-wrapper");

    fireEvent.click(img);

    expect(img).toHaveStyle({
      width: "100%",
      height: "100%",
    });

    await screen.findByRole("button", { name: /go back/i });
  });
});
