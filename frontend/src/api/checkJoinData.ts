import DefaultAxiosService from "@/service/DefaultAxiosService";

export const checkJoinData = async (
  type: string,
  data: any,
  set: React.Dispatch<React.SetStateAction<boolean>>,
  setM: React.Dispatch<React.SetStateAction<string>>
) => {
  switch (type) {
    case "login_id":
      try {
        const res = await DefaultAxiosService.instance.get(`/users/loginId`, {
          params: { login_id: data },
        });
        if (res.data.data.length) {
          set(false);
          setM("이미사용중인 아이디입니다.");
        }
      } catch (err) {
        console.log("err in checkJoinData:", err);
      }
      break;
    case "nickname":
      try {
        const res = await DefaultAxiosService.instance.get(`/users/nickname`, {
          params: { nickname: data },
        });
        if (res.data.data.length) {
          set(false);
          setM("이미사용중인 닉네임입니다.");
        }
      } catch (err) {
        console.log("err in checkJoinData:", err);
      }
      break;
    case "phone":
      try {
        const res = await DefaultAxiosService.instance.get(`/users/phone`, {
          params: { phone_number: data },
        });
        if (res.data.data.length) {
          set(false);
          setM("이미가입한 휴대폰번호 입니다.");
        }
      } catch (err) {
        console.log("err in checkJoinData:", err);
      }
      break;
  }
};
