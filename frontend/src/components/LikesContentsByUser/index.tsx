import { CsItem, PlaceProps, Recipe, User } from "@/types";
import Styles from "./index.module.css";
import RecipeList from "../RecipeList";
import PlaceList from "../PlaceList";
import CounselingList from "../CounselingList";

interface LikesContentsByUserProps {
  RecipeLikesList: Recipe[] | undefined;
  PlaceLikesList: PlaceProps[] | undefined;
  CounselingLikesList: CsItem[] | undefined;
  onClick: React.Dispatch<React.SetStateAction<string>>;
  user: User;
}
const LikesContentsByUser = ({
  RecipeLikesList,
  PlaceLikesList,
  CounselingLikesList,
  onClick,
  user,
}: LikesContentsByUserProps) => {
  const noData = () => {
    return (
      <div style={{ paddingLeft: "1rem", marginBottom: "1rem" }}>
        게시물이 존재하지 않습니다.
      </div>
    );
  };
  return (
    <div className={Styles.mylikes_page}>
      <div>
        <div style={{ position: "relative" }}>
          <div className={Styles.head_name}>레시피</div>
          {RecipeLikesList && RecipeLikesList.length > 3 ? (
            <div style={{ position: "absolute", right: "1rem", bottom: "0" }}>
              <button
                className={Styles.li_btn}
                onClick={() => onClick("좋아요 레시피자세히보기")}
              >
                자세히보기
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        {RecipeLikesList && RecipeLikesList.length ? (
          <RecipeList item={RecipeLikesList.slice(0, 3)} />
        ) : (
          noData()
        )}
      </div>
      <div>
        <div style={{ position: "relative" }}>
          <div className={Styles.head_name}>맛집</div>
          {PlaceLikesList && PlaceLikesList.length > 3 ? (
            <div style={{ position: "absolute", right: "1rem", bottom: "0" }}>
              <button
                className={Styles.li_btn}
                onClick={() => {
                  onClick("좋아요 맛집자세히보기");
                }}
              >
                자세히보기
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        {PlaceLikesList && PlaceLikesList.length ? (
          <PlaceList items={PlaceLikesList.slice(0, 3)} />
        ) : (
          noData()
        )}
      </div>
      <div>
        <div style={{ position: "relative" }}>
          <div className={Styles.head_name}>상담소</div>
          {CounselingLikesList && CounselingLikesList.length > 3 ? (
            <div style={{ position: "absolute", right: "1rem", bottom: "0" }}>
              <button
                className={Styles.li_btn}
                onClick={() => onClick("좋아요 상담자세히보기")}
              >
                자세히보기
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        {CounselingLikesList && CounselingLikesList.length ? (
          <CounselingList items={CounselingLikesList.slice(0, 3)} user={user} />
        ) : (
          noData()
        )}
      </div>
    </div>
  );
};
export default LikesContentsByUser;
