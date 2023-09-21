import axios from "axios";
import DefaultAxiosService from "@/service/DefaultAxiosService";
import { useRouter } from "next/router";
export const Logout = () => {
  const router = useRouter();
  const onClickLogout = async () => {
    try {
      DefaultAxiosService.instance
        .get(`http://${process.env.NEXT_PUBLIC_SERVER_HOST}:8000/logout`)
        .then((res) => {
          const status = res.status;
          console.log(status);
          if (status === 200) {
            router.reload();
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  return <button onClick={onClickLogout}>로그아웃</button>;
};
