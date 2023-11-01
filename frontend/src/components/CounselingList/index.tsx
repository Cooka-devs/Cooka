import { CsItem, User } from "@/types";
import Styles from "./index.module.css";
import { CounselingItem } from "./CounselingItem";
import { useEffect, useState } from "react";
import GetUser from "@/utilities/GetUser";

interface CsItemProps {
  items: CsItem[];
}

export const CounselingList = ({ items }: CsItemProps) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    GetUser(setUser);
  }, []);
  return (
    <div className={Styles.cslist}>
      {items.map((item, index) => {
        return <CounselingItem item={item} user={user} key={index} />;
      })}
    </div>
  );
};

export default CounselingList;
