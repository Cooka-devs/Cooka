import Styles from "./index.module.css";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import axios from "axios";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
const modules = {
  toolbar: {
    container: [
      ["link", "image", "video"],
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
    ],
  },
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "background",
  "color",
  "link",
  "image",
  "video",
  "width",
];

interface TextType {
  textType: string;
}
const CreateList = ({ textType }: TextType) => {
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const onChangeText = (e: any) => {
    setText(e);
    console.log("text", e);
  };
  const onChangeTitle = (e: any) => {
    setTitle(e.target.value);
    console.log("title", e.target.value);
  };
  const onClickCreateList = () => {
    if (textType === "recipe") {
      console.log("1");
      axios
        .post(`http://${process.env.NEXT_PUBLIC_SERVER_HOST}:8000/recipe`, {
          nickname: "123", //session에서 user정보를 가져와야함,
          login_id: "123", //마찬가지
          img: "23123", // list화면서 보여질 이미지를 따로 받아야하나 ?
          imgAlt: "recipe Image",
          content: text,
          category: "123", //textType이 recipe일때 따로 입력받기
          title: title,
          isHot: false,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className={Styles.makeboard}>
      <div className={Styles.makeboard_text}>
        <div>
          <input
            placeholder={
              textType === "recipe"
                ? `요리명을 입력하세요!`
                : textType === "place"
                ? "맛집명을 입력하세요"
                : ""
            }
            className={Styles.text_title}
            onChange={onChangeTitle}
          />
        </div>
        <div>
          {textType === "recipe" ? (
            <ReactQuill
              onChange={onChangeText}
              modules={modules}
              formats={formats}
              style={{ height: "64.219rem" }}
              placeholder="레시피를 입력하세요!"
            />
          ) : textType === "place" ? (
            <ReactQuill
              onChange={onChangeText}
              modules={modules}
              formats={formats}
              style={{ height: "64.219rem" }}
              placeholder="맛집정보를 입력하세요!"
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div style={{ width: "100%", textAlign: "center", paddingTop: "2rem" }}>
        <button
          className={Styles.submit_btn}
          onClick={() => onClickCreateList()}
        >
          작성완료
        </button>
      </div>
    </div>
  );
};
export default CreateList;
