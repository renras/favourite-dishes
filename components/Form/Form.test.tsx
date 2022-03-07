import { fireEvent, render, screen } from "@testing-library/react";
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

describe("form doesn't call formSubmitHandler if the required fields aren't filled out", () => {
  beforeEach(() => {
    render(<Form />);
  });

  test("form doesn't call formSubmitHandler if title is not filled out", async () => {
    fireEvent.input(screen.getByPlaceholderText("title"), {
      target: {
        value: "",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("url of image"), {
      target: {
        value:
          "https://images.pexels.com/photos/5945848/pexels-photo-5945848.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("description"), {
      target: {
        value: "This is a description",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("rating"), {
      target: {
        value: "5",
      },
    });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
  });

  test("form doesn't call formSubmitHandler if url of image is not filled out", async () => {
    fireEvent.input(screen.getByPlaceholderText("title"), {
      target: {
        value: "This is a title",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("url of image"), {
      target: {
        value: "",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("description"), {
      target: {
        value: "This is a description",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("rating"), {
      target: {
        value: "5",
      },
    });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));
    expect(
      await screen.findByText(/image url is required/i)
    ).toBeInTheDocument();
  });

  test("form doesn't call formSubmitHandler if description is not filled out", async () => {
    fireEvent.input(screen.getByPlaceholderText("title"), {
      target: {
        value: "This is a title",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("url of image"), {
      target: {
        value:
          "https://images.pexels.com/photos/5945848/pexels-photo-5945848.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("description"), {
      target: {
        value: "",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("rating"), {
      target: {
        value: "5",
      },
    });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));
    expect(
      await screen.findByText(/description is required/i)
    ).toBeInTheDocument();
  });

  test("form doesn't call formSubmitHandler if rating is not filled out", async () => {
    fireEvent.input(screen.getByPlaceholderText("title"), {
      target: {
        value: "This is a title",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("url of image"), {
      target: {
        value:
          "https://images.pexels.com/photos/5945848/pexels-photo-5945848.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("description"), {
      target: {
        value: "",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("rating"), {
      target: {
        value: "",
      },
    });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));
    expect(await screen.findByText(/rating is required/i)).toBeInTheDocument();
  });
});

describe("form would give error if the required input is invalid and submit form will not be called", () => {
  beforeEach(() => {
    render(<Form />);
  });

  test("form would give error if title input is invalid and submit form will not be called", async () => {
    fireEvent.input(screen.getByPlaceholderText("title"), {
      target: {
        value: "  This  is  a  title  ",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("url of image"), {
      target: {
        value:
          "https://images.pexels.com/photos/5945848/pexels-photo-5945848.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("description"), {
      target: {
        value: "This is a description",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("rating"), {
      target: {
        value: "5",
      },
    });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));
    expect(
      await screen.findByText(
        /title should contain only letters, and a single space between each word./i
      )
    ).toBeInTheDocument();
  });

  test("form would give error if number is greater than 5 and submit form will not be called", async () => {
    fireEvent.input(screen.getByPlaceholderText("title"), {
      target: {
        value: "This is a title",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("url of image"), {
      target: {
        value:
          "https://images.pexels.com/photos/5945848/pexels-photo-5945848.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("description"), {
      target: {
        value: "This is a description.",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("rating"), {
      target: {
        value: "6",
      },
    });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));
    expect(
      await screen.findByText(/pick a number from 1 to 5/i)
    ).toBeInTheDocument();
  });

  test("form would give error if number is less than 5 and submit form will not be called", async () => {
    fireEvent.input(screen.getByPlaceholderText("title"), {
      target: {
        value: "This is a title",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("url of image"), {
      target: {
        value:
          "https://images.pexels.com/photos/5945848/pexels-photo-5945848.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("description"), {
      target: {
        value: "This is a description.",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("rating"), {
      target: {
        value: "0",
      },
    });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));
    expect(
      await screen.findByText(/pick a number from 1 to 5/i)
    ).toBeInTheDocument();
  });

  test("form would give error if rating contains a letter and submit form will not be called", async () => {
    fireEvent.input(screen.getByPlaceholderText("title"), {
      target: {
        value: "This is a title",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("url of image"), {
      target: {
        value:
          "https://images.pexels.com/photos/5945848/pexels-photo-5945848.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("description"), {
      target: {
        value: "This is a description.",
      },
    });

    fireEvent.input(screen.getByPlaceholderText("rating"), {
      target: {
        value: "1sada",
      },
    });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));
    expect(
      await screen.findByText(/pick a number from 1 to 5/i)
    ).toBeInTheDocument();
  });
});
