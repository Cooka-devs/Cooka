import Styles from "./index.module.css";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useState } from "react";

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
const CreateRecipe = () => {
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
            placeholder="요리명을 입력하세요!"
            className={Styles.text_title}
            onChange={onChangeTitle}
          />
        </div>
        <div>
          <ReactQuill
            onChange={onChangeText}
            modules={modules}
            formats={formats}
            style={{ height: "50rem" }}
            placeholder="레시피를 입력하세요!"
          />
        </div>
      </div>
    </div>
  );
};
export default CreateRecipe;
