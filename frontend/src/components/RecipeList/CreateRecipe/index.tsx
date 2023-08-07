import Styles from "./index.module.css";
const CreateRecipe = () => {
  return (
    <div className={Styles.makeboard}>
      <div className={Styles.makeboard_text}>
        <div>
          <input
            placeholder="요리명을 입력하세요!"
            className={Styles.text_title}
          />
        </div>
        <div>
          <input
            placeholder="요리법을 설명해주세요!"
            className={Styles.text_content}
          />
        </div>
      </div>
    </div>
  );
};
export default CreateRecipe;
