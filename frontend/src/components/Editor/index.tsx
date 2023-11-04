import { searchUser } from "@/api/getCurrentUser";
import DefaultAxiosService from "@/service/DefaultAxiosService";
import FormAxiosService from "@/service/FormAxiosService";
import { CsItem, PlaceProps, Recipe, User } from "@/types";
import { getImgInText } from "@/utilities/getImgSrcInText";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AniButton from "../AniButton";
import Modal from "../Modal";
import { WantLoginModalText } from "../WantLoginModalText";
import { CategorySelect } from "./CategorySelect";
import Styles from "./index.module.css";
import GetUser from "@/utilities/GetUser";

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
  modifyType?: string;
  post?: Recipe | PlaceProps | CsItem;
}

const Editor = ({ textType, modifyType, post }: TextType) => {
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [user, setUser] = useState<null | User>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [errText, setErrorText] = useState<string>("");
  const [mainImg, setMainImg] = useState<null | string>(null);
  const quillRef = useRef<ReactQuill>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [shouldSetSelection, setShouldSetSelection] = useState(false);
  const router = useRouter();
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

  const onClickCreateList = async () => {
    const imgSrcInText = getImgInText(text);
    if (!imgSrcInText.length) {
      await setMainImg(
        `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:3000/noneImg.jpg`
      );
    } else {
      await setMainImg(imgSrcInText[0].src);
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
    if (!!mainImg) {
      if (textType === "modify") {
        if (
          (modifyType === "recipe" && post) ||
          (modifyType === "place" && post)
        ) {
          if (title === "" || text === "" || category === "") {
            setErrorText("제목,글내용,카테고리선택을 확인해주세요!");
            setMainImg(null);
          } else {
            if (!!user) {
              DefaultAxiosService.instance
                .put(`/${modifyType}/${post.id}`, {
                  writer: user.nickname,
                  imgSrc: mainImg,
                  imgAlt: `${modifyType}Img`,
                  content: text,
                  category: category,
                  title: title,
                  isHot: false,
                })
                .then((res) => {
                  console.log(res);
                  router.reload();
                })
                .catch((err) => console.log(err));
            } else {
              setModal(true);
            }
          }
        } else if (modifyType === "counseling" && post) {
          if (title === "" || text === "") {
            setErrorText("제목,글내용을 확인해주세요!");
            setMainImg(null);
          } else {
            if (!!user) {
              DefaultAxiosService.instance
                .put(`/${modifyType}/${post.id}`, {
                  writer: user.nickname,
                  content: text,
                  title: title,
                })
                .then((res) => {
                  console.log(res);
                  router.reload();
                })
                .catch((err) => console.log(err));
            } else {
              setModal(true);
            }
          }
        }
      } else {
        if (textType === "recipe" || textType === "place") {
          if (title === "" || text === "" || category === "") {
            setErrorText("제목,글내용,카테고리선택을 확인해주세요!");
            setMainImg(null);
          } else {
            if (!!user) {
              DefaultAxiosService.instance
                .post(`/${textType}`, {
                  writer: user.nickname,
                  imgSrc: mainImg,
                  imgAlt: `${textType}Img`,
                  content: text,
                  category: category,
                  title: title,
                  isHot: false,
                })
                .then((res) => {
                  console.log(res);
                  router.reload();
                })
                .catch((err) => console.log(err));
            } else {
              setModal(true);
            }
          }
        } else if (textType === "counseling") {
          if (title === "" || text === "") {
            setErrorText("제목,글내용을 확인해주세요!");
            setMainImg(null);
          } else {
            if (!!user) {
              DefaultAxiosService.instance
                .post(`/${textType}`, {
                  writer: user.nickname,
                  content: text,
                  title: title,
                })
                .then((res) => {
                  console.log(res);
                  router.reload();
                })
                .catch((err) => console.log(err));
            } else {
              setModal(true);
            }
          }
        }
      }
    }
  }, [
    category,
    mainImg,
    modifyType,
    post,
    router,
    text,
    textType,
    title,
    user,
  ]);

  useEffect(() => {
    GetUser(setUser);
    if (post && textType === "modify") {
      setText(post.content);
    }
  }, [post, textType]);

  useEffect(() => {
    if (shouldSetSelection) {
      if (inputRef.current && quillRef.current?.editor) {
        console.log("inputRef.current.value:", inputRef.current.value);
        inputRef.current.value = "";
        quillRef.current.setEditorSelection(quillRef.current.editor, {
          index: 9999,
          length: 1,
        });
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        if (range) {
          editor.setSelection(range.index + 1, 1);
        }
        setText((prev) => prev + "<p><br/></p>");
        console.log(text);
        console.log(quillRef.current.editor);
      }
      setShouldSetSelection(false);
    }
  }, [shouldSetSelection, text]);

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
              await setText((prev) => prev + `<img src="${imgUrl}"/>`);
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
                : textType === "counseling"
                ? "고민명을 입력하세요"
                : textType === "modify"
                ? "수정할 제목을 입력하세요"
                : ""
            }
            className={Styles.text_title}
            onChange={onChangeTitle}
          />
          {textType === "recipe" ||
          textType === "place" ||
          modifyType === "recipe" ||
          modifyType === "place" ? (
            <select className={Styles.select_option} onChange={selectCategory}>
              <option hidden>카테고리</option>
              <CategorySelect textType={textType} modifyType={modifyType} />
            </select>
          ) : (
            ""
          )}
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
              className={Styles.editor_text}
            />
          ) : textType === "place" ? (
            <ReactQuill
              ref={quillRef}
              id={"quill"}
              value={text}
              onChange={onChangeText}
              modules={modules}
              formats={formats}
              style={{ height: "64.219rem" }}
              placeholder="맛집정보를 입력하세요!"
            />
          ) : textType === "counseling" ? (
            <ReactQuill
              ref={quillRef}
              id={"quill"}
              value={text}
              onChange={onChangeText}
              modules={modules}
              formats={formats}
              style={{ height: "64.219rem" }}
              placeholder="고민을 입력하세요!"
            />
          ) : textType === "modify" ? (
            <ReactQuill
              ref={quillRef}
              id={"quill"}
              value={text}
              onChange={onChangeText}
              modules={modules}
              formats={formats}
              style={{ height: "64.219rem" }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div style={{ width: "100%", textAlign: "center", paddingTop: "2rem" }}>
        <AniButton
          className={Styles.submit_btn}
          onClick={() => onClickCreateList()}
        >
          작성완료
        </AniButton>
      </div>
      <div className={Styles.err_text}>{errText}</div>
    </div>
  );
};
export default Editor;
