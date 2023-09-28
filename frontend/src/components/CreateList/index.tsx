import { CsItem, PlaceProps, Recipe } from "@/types";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const Editor = dynamic(() => import("../Editor"), {
  ssr: false,
});

interface TextType {
  textType: string;
  modifyType?: string;
  post?: Recipe | PlaceProps | CsItem;
}

const CreateList = ({ textType, modifyType, post }: TextType) => {
  return <Editor textType={textType} modifyType={modifyType} post={post} />;
};

export default CreateList;
