import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Given Button component", () => {
  describe("When clicked", () => {
    test("Then it should call it's onclick function", () => {
      const fun = jest.fn();
      render(<Button onClick={fun} />);

      const button = screen.getByRole("button");
      userEvent.click(button);

      expect(fun).toHaveBeenCalled();
    });
  });
});
