import Styles from "../index.module.css";
const Main = () => {
  return (
    <div className={Styles.main}>
      <div className={Styles.main_container}>
        <div className={Styles.main_item}>
          <div className={Styles.main_ad}>
            <img
              src="https://img.etnews.com/photonews/2007/1321919_20200721151233_568_0001.jpg"
              className={Styles.main_ad_item}
              alt="ad1"
            />
            <div className={Styles.main_ad_item}>ad2</div>
            <div className={Styles.main_ad_item}>ad3</div>
          </div>
        </div>
        <div className={Styles.main_item}>화제의 레시피</div>
        <div className={Styles.main_item}>인기쉐프</div>
        <div className={Styles.main_item}>
          <div className={Styles.main_item_item}>제철요리</div>
          <div className={Styles.main_item_item}>화제의 맛집</div>
        </div>
      </div>
    </div>
  );
};
export default Main;
