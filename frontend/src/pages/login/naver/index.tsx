import { useEffect } from "react";
const naverLoginPage = () => {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log("code:", code);
    //인가코드 =>벡엔드로 전달해주자
  }, []);
  return (
    <div>
      <div>네이버로그인페이지</div>
    </div>
  );
};
export default naverLoginPage;
