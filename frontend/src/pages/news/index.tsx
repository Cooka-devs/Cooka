import Styles from "./index.module.css";
interface newsItemsProp {
  imgSrc: string;
  imgArt: string;
  title: string;
  url: string;
  data: Date;
}
// interface newsItemsProps extends Array<newsItemsProp> {}
const NEWSDATA = [
  {
    imgSrc:
      "https://ichef.bbci.co.uk/news/800/cpsprodpb/4a21/live/77387860-fc31-11ed-92cc-b3a9bf1f67e9.png",
    imgArt: "newsimage",
    title: "밀가루보다 콩가루가 건강에 더 좋을까?",
    url: "https://www.bbc.com/korean/articles/ckmzmdxmnjeo",
    date: "2023-08-11",
  },
  {
    imgSrc:
      "https://ichef.bbci.co.uk/news/800/cpsprodpb/12DD8/production/_127027277_625eadbc-66d9-4dae-89ab-908d5ad1d7e9.jpg",
    imgArt: "newsimage",
    title: "일본 최고의 소고기를 가리는 '와규 올림픽'",
    url: "https://www.bbc.com/korean/features-63196472",
    date: "2023-08-11",
  },
  {
    imgSrc: "https://img.sbs.co.kr/newimg/news/20220727/201685768_300.jpg",
    imgArt: "newsimage",
    title: "식용유로 요리하기 겁난다, 식품류 가격 줄인상 이제 시작",
    url: "https://news.sbs.co.kr/news/endPage.do?news_id=N1006837555",
    date: "2023-08-11",
  },
  {
    imgSrc: "https://img.sbs.co.kr/newimg/news/20220602/201669616_300.jpg",
    imgArt: "newsimage",
    title: "김치 재탄생 미션' 스페인 요리 경연 프로 시청률이 무려?",
    url: "https://news.sbs.co.kr/news/endPage.do?news_id=N1006773368",
    date: "2023-08-11",
  },
];
const news = () => {
  return (
    <div className={Styles.news}>
      <div className={Styles.news_left}>
        {NEWSDATA.map((newsitem, index) => {
          return (
            <a href={newsitem.url} className={Styles.flex_row} key={index}>
              <div className={Styles.row_img}>
                <img src={newsitem.imgSrc} alt={newsitem.imgArt} />
              </div>
              <div className={Styles.row_title}>
                <div>{newsitem.title}</div>
                <div>{newsitem.date}</div>
              </div>
            </a>
          );
        })}
      </div>
      <div className={Styles.news_right}>
        <div className={Styles.right_text}>
          각종 다양한 요리관련뉴스를 읽어보세요!
        </div>
      </div>
    </div>
  );
};
export default news;
