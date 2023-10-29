import { create } from "zustand";

interface StoreProps {
  url: string;
  setUrl: (url: string) => void;
}

//zustand로 상태관리를 하는 이유 :
//마이페이지나 작성페이지를 비로그인상태로 클릭시 로그인페이지로 이동합니다.
//그후 로그인을 하고난후 다시 마이페이지나 작성페이지로 이동하기 위해서 로그인페이지전 url을 저장합니다.
const useStore = create<StoreProps>((set) => ({
  url: "",
  setUrl: (url) => set({ url: url }),
}));

export default useStore;
