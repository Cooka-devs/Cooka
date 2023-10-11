import Styles from "./index.module.css";
import { User } from "@/types";
import { useRouter } from "next/router";
interface ChefItemProp {
  user: User;
}
export const ChefItem = ({ user }: ChefItemProp) => {
  const router = useRouter();
  return (
    <div
      className={Styles.list_item}
      onClick={() => router.push({ pathname: `/chef/${user.id}` })}
    >
      <img
        src={user.profile_img}
        alt={"profile_img"}
        className={Styles.list_img}
      />
      <div className={Styles.list_title}>{user.nickname} 쉐프</div>
    </div>
  );
};
