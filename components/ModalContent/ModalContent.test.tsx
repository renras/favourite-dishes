import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ModalContent from "./ModalContent";

test("modal content renders children", () => {
  const mockComponent = () => (
    <div data-testid="custom-element">Hello World</div>
  );

  render(<ModalContent>{mockComponent()}</ModalContent>);

  expect(screen.getByTestId("custom-element")).toBeInTheDocument();
});
