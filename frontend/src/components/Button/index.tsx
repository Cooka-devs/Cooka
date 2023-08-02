import Styles from "./index.module.css";

interface ButtonProps {
  children: React.ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return <button className={Styles.button}>{children}</button>;
};

export default Button;
