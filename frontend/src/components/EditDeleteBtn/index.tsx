import { CsItem, PlaceProps, Recipe, User } from "@/types";
import AniButton from "../AniButton";

interface EditDeleteBtnProps {
  user: User | null;
  post: Recipe | CsItem | PlaceProps;
  setDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setModify: React.Dispatch<React.SetStateAction<boolean>>;
}
export const EditDeleteBtn = ({
  user,
  post,
  setDelete,
  setModify,
}: EditDeleteBtnProps) => {
  return (
    <>
      {!!user && user.nickname === post.writer ? (
        <span
          style={{
            position: "absolute",
            right: "0",
            top: "1rem",
            display: "flex",
            gap: "1rem",
          }}
        >
          <AniButton
            style={{ fontSize: "1.5rem", fontFamily: "SUITE-Regular" }}
            onClick={() => setDelete(true)}
          >
            ❌글삭제
          </AniButton>
          <AniButton
            style={{ fontSize: "1.5rem", fontFamily: "SUITE-Regular" }}
            onClick={() => setModify(true)}
          >
            ❗글수정
          </AniButton>
        </span>
      ) : (
        ""
      )}
    </>
  );
};
