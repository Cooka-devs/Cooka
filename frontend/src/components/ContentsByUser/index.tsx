import { CsItem, PlaceProps, Recipe } from "@/types";
import Styles from "./index.module.css";
import { RecipeList } from "..";
import PlaceList from "../PlaceList";
import CounselingList from "../CounselingList";
interface ContentsByUserProps {
  uniqueRecipeList: Recipe[] | undefined;
  uniquePlaceList: PlaceProps[] | undefined;
  uniqueCsList: CsItem[] | undefined;
  onClick: any;
}
const ContentsByUser = ({
  uniqueRecipeList,
  uniquePlaceList,
  uniqueCsList,
  onClick,
}: ContentsByUserProps) => {
  const noData = () => {
    return (
      <div style={{ paddingLeft: "1rem", marginBottom: "1rem" }}>
        게시물이 존재하지 않습니다.
      </div>
    );
  };
  return (
    <div className={Styles.mycommentpage}>
      <div>
        <div style={{ position: "relative" }}>
          <div className={Styles.head_name}>레시피</div>
          {uniqueRecipeList && uniqueRecipeList.length > 3 ? (
            <div style={{ position: "absolute", right: "1rem", bottom: "0" }}>
              <button
                className={Styles.li_btn}
                onClick={() => onClick("댓글 레시피자세히보기")}
              >
                자세히보기
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        {uniqueRecipeList && uniqueRecipeList.length ? (
          <RecipeList items={uniqueRecipeList.slice(0, 3)} />
        ) : (
          noData()
        )}
      </div>
      <div>
        <div style={{ position: "relative" }}>
          <div className={Styles.head_name}>맛집</div>
          {uniquePlaceList && uniquePlaceList.length > 3 ? (
            <div style={{ position: "absolute", right: "1rem", bottom: "0" }}>
              <button
                className={Styles.li_btn}
                onClick={() => {
                  onClick("댓글 맛집자세히보기");
                }}
              >
                자세히보기
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        {uniquePlaceList && uniquePlaceList.length ? (
          <PlaceList items={uniquePlaceList.slice(0, 3)} />
        ) : (
          noData()
        )}
      </div>
      <div>
        <div style={{ position: "relative" }}>
          <div className={Styles.head_name}>상담소</div>
          {uniqueCsList && uniqueCsList.length > 3 ? (
            <div style={{ position: "absolute", right: "1rem", bottom: "0" }}>
              <button
                className={Styles.li_btn}
                onClick={() => onClick("댓글 상담자세히보기")}
              >
                자세히보기
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        {uniqueCsList && uniqueCsList.length ? (
          <CounselingList items={uniqueCsList.slice(0, 3)} />
        ) : (
          noData()
        )}
      </div>
    </div>
  );
};
export default ContentsByUser;
