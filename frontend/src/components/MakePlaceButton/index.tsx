import Styles from "./index.module.css";
const MakePlaceButton = ({ onClick }: any) => {
  return (
    <button onClick={() => onClick()} className={Styles.make_btn}>
      <div style={{ fontSize: "2rem", fontWeight: "700" }}>작성하기</div>
      <div style={{ fontSize: "1.5rem", paddingTop: "1rem" }}>
        자기만의 좋았던 식당,카페 등
        <br />
        다양한 맛집과 행복한 추억들을
        <br />
        나누어요!
      </div>
    </button>
  );
};
export default MakePlaceButton;
