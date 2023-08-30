import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const NaverLoginPage = () => {
  const [code, setCode] = useState("");
  const router = useRouter();

  useEffect(() => {
    console.log("query??", router.query);
    if (!router.isReady || !router.query["code"]) return;
    setCode(router.query["code"].toString());
    console.log("code:", code);
  }, []);

  return (
    <div>
      <div>네이버로그인페이지</div>
    </div>
  );
};
export default NaverLoginPage;
