import { searchUser } from "@/api/getCurrentUser";
import PlaceItem from "./PlaceItem";
import Styles from "./index.module.css";
import { PlaceProps, User } from "@/types";
import { useState, useEffect } from "react";

interface PlaceListProps {
  items: PlaceProps[];
}

const PlaceList = ({ items }: PlaceListProps) => {
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    const fetch = async () => {
      const getU = await searchUser();
      await setUser(getU);
    };
    fetch();
  }, []);

  return (
    <div className={Styles.list_container}>
      {items.map((place, index) => {
        return !!user ? <PlaceItem item={place} key={index} user={user} /> : "";
      })}
    </div>
  );
};
export default PlaceList;
