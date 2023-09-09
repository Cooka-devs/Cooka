import { Divider } from "..";
import Styles from "./index.module.css";
import { useRouter } from "next/router";
interface BestItemsProps {
  title: string;
  items: {
    id: number;
    imgSrc?: string;
    imgAlt?: string;
    itemTitle?: string;
    likes?: number;
    views?: number;
    content?: string;
  }[];
}
//title이 화제의 레시피일때 , 인기쉐프, 화제의고민, 화제의맛집일때를
//나눠서 if (title==="??") => 클릭시 content detail 까지 연결
//인기쉐프 이미지는 해당user 프로필img를 등록시 나오게 없을시 지정이미지 출력
const BestItems = ({ title, items }: BestItemsProps) => {
  const router = useRouter();
  const onClickContent = (title: string, id: number) => {
    if (title === "화제의 레시피") {
      router.push(`/recipe/${id}`);
    } else if (title === "인기 쉐프") {
      router.push(`/chef/${id}`);
    } else if (title === "화제의 고민") {
      router.push(`/counseling/${id}`);
    } else if (title === "화제의 맛집") {
      router.push(`/place/${id}`);
    }
  };
  return (
    <div className={Styles.main_item}>
      <div style={{ fontWeight: "700" }}>{title}</div>
      <div className={Styles.bestcontainer}>
        {items.map((item, index) => {
          return (
            <div
              className={Styles.bestcontainer_item}
              key={index}
              onClick={() => {
                onClickContent(title, item.id);
              }}
            >
              {item.imgSrc ? (
                <>
                  <img src={item.imgSrc} alt={item.imgAlt} />
                  <div>{item.itemTitle}</div>
                  {item?.likes && item?.views && (
                    <div>{`${item.likes}/${item.views}`}</div>
                  )}
                </>
              ) : (
                <div className={Styles.cs_text}>{item.content}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BestItems;
