import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders initial target step", () => {
  render(<App />);
  const titleElement = screen.getByText(/누구에게/i);
  expect(titleElement).toBeInTheDocument();

  const buttonElement = screen.getByText(/부모님/i);
  expect(buttonElement).toBeInTheDocument();
});
