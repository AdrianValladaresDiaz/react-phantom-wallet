import React, { ReactElement } from "react";

type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  content?: string;
};

const Button = ({ onClick, content = "" }: ButtonProps): ReactElement => (
  <button type="button" title="title" onClick={onClick}>
    {content}
  </button>
);

Button.defaultProps = {
  content: "",
};
export default Button;
