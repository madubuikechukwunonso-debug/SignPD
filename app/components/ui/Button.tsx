import { FC, ButtonHTMLAttributes } from "react";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className = "",
  ...rest
}) => (
  <button
    {...rest}
    className={`px-4 py-2 rounded-lg transition disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
);

export default Button;
