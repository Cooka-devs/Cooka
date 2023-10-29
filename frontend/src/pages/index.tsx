import BestItems from "@/components/BestItems";
import DefaultAxiosService from "@/service/DefaultAxiosService";
import { CsItem, PlaceProps, Recipe, User } from "@/types";
import { useEffect, useState } from "react";
import Styles from "./index.module.css";
import { best, TYPES } from "@/constants";
import { getCurrentUser, searchUser } from "@/api/getCurrentUser";
import { SlideImg } from "@/components/SlideImg";

interface BestItemProps {
  title: string;
  items: (Recipe | CsItem | PlaceProps)[];
}

export default function Home() {
  const [bestItems, setBestItems] = useState<BestItemProps[]>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const call = async () => {
      const promises = TYPES.map(async (item, index) => {
        await DefaultAxiosService.instance.get(`/best/${item}`).then((res) => {
          best[index].items = res.data.data;
        });
      });
      await Promise.all(promises);
      setBestItems(() => {
        return [...best]; // best가 변경됐을때 , 참조값으로 들어가면
        //상태가 변경됨을 인지하지못해, 리렌더링을 막습니다.
        //그래서 복사본을 떠서 주소값을 바꿔줌으로써 리렌더링을 하게됩니다.
      });
      const getU = await searchUser();
      setUser(getU);
    };
    call();
  }, []);

  return (
    <div className={Styles.main}>
      <div className={Styles.main_container}>
        <div className={Styles.main_item}>
          <SlideImg />
        </div>
        <div className={Styles.best_container}>
          <div className={Styles.flex_row}>
            {bestItems?.map((bestItem, index) => {
              return (
                <BestItems
                  title={bestItem.title}
                  items={bestItem.items}
                  user={user}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
