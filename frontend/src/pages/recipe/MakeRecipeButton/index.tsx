import Styles from "./index.module.css";
const MakeRecipeButton = ({ onClick }: any) => {
  const content = `자기만의 요리법, 예쁜 플레이팅,
  요리 꿀팁 등 다양한 레시피를 함께
  나누어요!`;
  return (
    <button onClick={() => onClick()} className={Styles.make_btn}>
      <div style={{ fontSize: "2rem", fontWeight: "700" }}>작성하기</div>
      <div style={{ fontSize: "1.5rem", paddingTop: "1rem" }}>
        자기만의 요리법, 예쁜 플레이팅,
        <br />
        요리 꿀팁 등 다양한 레시피를 함께
        <br />
        나누어요!
      </div>
    </button>
  );
};
export default MakeRecipeButton;
