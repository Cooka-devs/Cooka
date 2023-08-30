import Styles from "./index.module.css";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

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

  const onChangeText = (e: string) => {
    setText(e);
    console.log("text", e);
  };
  const onChangeTitle = (e: any) => {
    setTitle(e.target.value);
    console.log("title", e.target.value);
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
        <button className={Styles.submit_btn}>작성완료</button>
      </div>
    </div>
  );
};
export default CreateList;
