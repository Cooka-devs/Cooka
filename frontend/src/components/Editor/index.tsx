import { searchUser } from "@/api/getCurrentUser";
import { PLACECATEGORY, RECIPECATEGORY } from "@/constants";
import { User } from "@/types";
import { getImgInText } from "@/utilities/getImgSrcInText";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Modal from "../Modal";
import { WantLoginModalText } from "../WantLoginModalText";
import Styles from "./index.module.css";

import FormAxiosService from "@/service/FormAxiosService";
import ReactQuill from "react-quill";

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

const Editor = ({ textType }: TextType) => {
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [user, setUser] = useState<undefined | User>();
  const [modal, setModal] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [errText, setErrorText] = useState<string>("");
  const [mainImg, setMainImg] = useState<string>("최초렌더링실행방지");
  const quillRef = useRef<ReactQuill>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [shouldSetSelection, setShouldSetSelection] = useState(false);

  const selectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const closeModal = () => {
    setModal(false);
  };

  const onChangeText: ReactQuill.ReactQuillProps["onChange"] = async (e) => {
    await setText(e);
    console.log(text);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onClickCreateList = () => {
    const imgSrcInText = getImgInText(text);
    if (!imgSrcInText.length) {
      setMainImg(
        `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:3000/noneImg.jpg`
      );
    } else {
      setMainImg(imgSrcInText[0].src);
    }
  };

  const modules = useMemo(() => {
    return {
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
        handlers: {
          image: () => inputRef.current?.click(),
        },
      },
    };
  }, []);

  useEffect(() => {
    if (mainImg !== "최초렌더링실행방지") {
      if (title === "" || text === "" || category === "") {
        setErrorText("제목,글내용,카테고리선택을 확인해주세요!");
      } else {
        if (user != undefined) {
          console.log("img:", mainImg);
          console.log("제목:", title);
          console.log("내용:", text);
          axios
            .post(
              `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:8000/${textType}`,
              {
                writer: user.nickname,
                imgSrc: mainImg,
                imgAlt: "recipe Image",
                content: text,
                category: category,
                title: title,
                isHot: false,
              }
            )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        } else {
          setModal(true);
        }
      }
    }
  }, [mainImg]);

  useEffect(() => {
    const fetch = async () => {
      const getU = await searchUser();
      setUser(getU);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (shouldSetSelection) {
      if (inputRef.current && quillRef.current?.editor) {
        inputRef.current.value = "";
        quillRef.current.setEditorSelection(quillRef.current.editor, {
          index: 9999,
          length: 1,
        });
      }
      setShouldSetSelection(false);
    }
  }, [shouldSetSelection]);

  return (
    <div className={Styles.makeboard}>
      <input
        ref={inputRef}
        hidden
        type={"file"}
        accept={"image/*"}
        onChange={async (e) => {
          const editor = document.getElementsByClassName("ql-editor");
          console.log(editor[0]);
          if (!e.target.files) return;
          const selectImg =
            e.target.files?.length > 0 ? e.target.files[0] : null;
          if (selectImg) {
            const formData = new FormData();
            formData.append("image", selectImg);
            try {
              const result = await FormAxiosService.instance.post(
                "/image",
                formData
              );
              const imgUrl = `${result.data.imgSrc}`;
              setText((prev) => prev + `<img src="${imgUrl}"/>`);
              setShouldSetSelection(true);
            } catch (err) {
              console.log(err);
            }
          } else {
            console.log("no file err");
          }
        }}
      />
      {modal ? (
        <Modal
          closeModal={closeModal}
          content={<WantLoginModalText closeModal={setModal} />}
        />
      ) : (
        ""
      )}
      <div className={Styles.makeboard_text}>
        <div style={{ position: "relative" }}>
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
          <select className={Styles.select_option} onChange={selectCategory}>
            <option hidden>카테고리</option>
            {textType === "recipe"
              ? RECIPECATEGORY.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))
              : PLACECATEGORY.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
          </select>
        </div>
        <div>
          {textType === "recipe" ? (
            <ReactQuill
              ref={quillRef}
              id={"quill"}
              onChange={onChangeText}
              modules={modules}
              value={text}
              formats={formats}
              style={{ height: "64.219rem" }}
              placeholder="레시피를 입력하세요!"
            />
          ) : textType === "place" ? (
            <ReactQuill
              ref={quillRef}
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
      <div className={Styles.err_text}>{errText}</div>
    </div>
  );
};
export default Editor;
