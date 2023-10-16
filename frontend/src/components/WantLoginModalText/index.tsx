import Styles from "./index.module.css";
import { useRouter } from "next/router";
import useStore from "@/store";
interface WantLoginModalProp {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  //React.Dispatch란 React에서 제공되는 제네릭타입중하나.
  //React컴포넌트에서 상태(state)를 변경하기위한 함수를 나타냄.
  //일반적으로 useState함수로 생성된 상태업데이트 함수의 타입으로 나타냄
  //React.SetStateAction 또다른 제네릭타입.
  //useState함수를 사용하여 상태를 업데이트할때 사용되는 값의 타입을 나타냄.
  //bollean값을 받아서 해당상태를 업데이트하는 함수의타입이다
}
export const WantLoginModalText: React.FC<WantLoginModalProp> = ({
  closeModal,
}) => {
  const { setUrl } = useStore();
  const router = useRouter();
  console.log(router.pathname);
  return (
    <div className={Styles.loginModalText}>
      <h1 style={{ fontSize: "3rem" }}>로그인이 필요합니다.</h1>
      <div style={{ paddingTop: "3rem", fontSize: "2rem" }}>
        로그인하시겠습니까?
      </div>
      <div
        style={{
          paddingTop: "2rem",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => {
            setUrl(router.pathname);
            router.push("/login");
          }}
        >
          예
        </button>
        <button
          onClick={() => {
            closeModal(false);
          }}
        >
          아니오
        </button>
      </div>
    </div>
  );
};
