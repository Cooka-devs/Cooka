import { searchUser } from "@/api/getCurrentUser";
import PlaceItem from "./PlaceItem";
import Styles from "./index.module.css";
import { PlaceProps, User } from "@/types";
import { useState, useEffect } from "react";
import GetUser from "@/utilities/GetUser";

interface PlaceListProps {
  items: PlaceProps[];
}

const PlaceList = ({ items }: PlaceListProps) => {
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    GetUser(setUser);
  }, []);

  return (
    <div className={Styles.list_container}>
      {items.map((place, index) => {
        return <PlaceItem item={place} key={index} user={user} />;
      })}
    </div>
  );
};
export default PlaceList;
