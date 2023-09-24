import Styles from "./index.module.css";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import axios from "axios";
import { searchUser } from "@/fetch/getCurrentUser";
import { User } from "@/types";
import Modal from "../Modal";
import { WantLoginModalText } from "../WantLoginModalText";
import { PLACECATEGORY, RECIPECATEGORY } from "@/constants";
import { getImgInText } from "@/utilities/getImgSrcInText";
import { useRef, useMemo } from "react";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

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
  const quillRef = useRef(null);
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [user, setUser] = useState<undefined | User>();
  const [modal, setModal] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [errText, setErrorText] = useState<string>("");

  const imageUploadHanler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.addEventListener("change", async (e: any) => {
      const selectImg = e.target.files ? e.target.files[0] : null;
      if (selectImg) {
        const formData = new FormData();
        formData.append("image", selectImg);
        try {
          const result = await axios.post(
            `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:8000/image`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("result:", result);
          const imgUrl = `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:8000${result.data.imgSrc}`;
          console.log("imgUrl:", imgUrl);
          setText((prev) => prev + `<img src="${imgUrl}"/>`);
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("no file err");
      }
    });
    input.click();
  };
  const selectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const closeModal = () => {
    setModal(false);
  };
  const onChangeText = async (e: any) => {
    await setText(e);
    console.log(text);
  };
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onClickCreateList = () => {
    if (title === "" || text === "" || category === "") {
      setErrorText("제목,글내용,카테고리선택을 확인해주세요!");
    } else {
      if (user != undefined) {
        console.log("제목:", title);
        console.log("내용:", text);
        // axios
        //   .post(
        //     `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:8000/${textType}`,
        //     {
        //       writer: user.nickname, //session에서 user정보를 가져와야함,
        //       imgSrc: "23123", // list화면서 보여질 이미지를 따로 받아야하나 ?
        //       imgAlt: "recipe Image",
        //       content: text,
        //       category: category, //textType이 recipe일때 따로 입력받기
        //       title: title,
        //       isHot: false,
        //     }
        //   )
        //   .then((res) => console.log(res))
        //   .catch((err) => console.log(err));
      } else {
        setModal(true);
      }
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
          image: imageUploadHanler,
        },
      },
    };
  }, []);
  useEffect(() => {
    const fetch = async () => {
      const getU = await searchUser();
      setUser(getU);
    };
    fetch();
  }, []);
  return (
    <div className={Styles.makeboard}>
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
              onChange={onChangeText}
              modules={modules}
              value={text}
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
      <div className={Styles.err_text}>{errText}</div>
    </div>
  );
};
export default CreateList;
