import CounselingList from "../CounselingList";
import ListPageMove from "../ListPageMove";
import NoData from "../NoData";
import PlaceList from "../PlaceList";
import RecipeList from "../RecipeList";

interface DivDataByLengthProps {
  list: any[] | undefined;
  listLength: number;
  size: number;
  pageMove: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  type: string;
}
export const DivDataByLength = ({
  list,
  listLength,
  size,
  pageMove,
  currentPage,
  type,
}: DivDataByLengthProps) => {
  switch (type) {
    case "recipe":
      if (list?.length) {
        return (
          <>
            <RecipeList item={list} />
            <ListPageMove
              totalPosts={listLength}
              postsPerPage={size}
              pageMove={pageMove}
              currentPage={currentPage}
            />
          </>
        );
      } else {
        return <NoData paddingLeft="1rem" marginBottom="1rem" />;
      }

    case "place":
      if (list?.length) {
        return (
          <>
            <PlaceList items={list} />
            <ListPageMove
              totalPosts={listLength}
              postsPerPage={size}
              pageMove={pageMove}
              currentPage={currentPage}
            />
          </>
        );
      } else {
        return <NoData paddingLeft="1rem" marginBottom="1rem" />;
      }

    case "counseling":
      if (list?.length) {
        return (
          <>
            <CounselingList items={list} />
            <ListPageMove
              totalPosts={listLength}
              postsPerPage={size}
              pageMove={pageMove}
              currentPage={currentPage}
            />
          </>
        );
      } else {
        return <NoData paddingLeft="1rem" marginBottom="1rem" />;
      }
  }
};
