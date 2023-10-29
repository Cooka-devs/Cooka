import Styles from "./index.module.scss";

interface AniButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const AniButton = (props: AniButtonProps) => {
  return <button className={Styles.AniButton} {...props} />;
};

export default AniButton;
