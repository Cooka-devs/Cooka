import Styles from "./index.module.css";
import { User } from "@/types";
import { useRouter } from "next/router";
import ListItem from "../ListItem";

interface ChefListProp {
  items: User[];
}

interface ChefItemProp {
  item: User;
}

export const ChefItem = ({ item }: ChefItemProp) => {
  const router = useRouter();

  return (
    <ListItem
      imgProps={{
        src: item.profile_img,
        alt: "profile_img",
        className: Styles.list_img,
        onClick: () => router.push({ pathname: `/chef/${item.id}` }),
      }}
    >
      <div className={Styles.list_title}>{item.nickname} 쉐프</div>
    </ListItem>
  );
};
export const ChefList = ({ items }: ChefListProp) => {
  return (
    <div className={Styles.list}>
      {items.map((item, index) => {
        return <ChefItem item={item} key={index} />;
      })}
    </div>
  );
};
