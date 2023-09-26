import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const Editor = dynamic(() => import("../Editor"), {
  ssr: false,
});

interface TextType {
  textType: string;
}

const CreateList = ({ textType }: TextType) => {
  return <Editor textType={textType} />;
};

export default CreateList;
