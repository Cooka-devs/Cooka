import AniButton from "../AniButton";
import Styles from "./index.module.css";
interface CancelPostButtonProps {
  set: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
}
export const CancelPostButton = ({ set, text }: CancelPostButtonProps) => {
  return (
    <AniButton className={Styles.goback_btn} onClick={() => set(false)}>
      <div style={{ fontSize: "2rem", fontWeight: "700" }}>돌아가기</div>
      <div style={{ fontSize: "1.5rem", paddingTop: "1rem" }}>
        {text} 페이지로
        <br />
        돌아갈께요.
      </div>
    </AniButton>
  );
};
