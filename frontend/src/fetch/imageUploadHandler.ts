import axios from "axios";
interface ImageUploadProp {
  setText: React.Dispatch<React.SetStateAction<string>>;
}
export const imageUploadHanler = ({ setText }: ImageUploadProp) => {
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
        const imgUrl = result.data.imgSrc;
        setText((prev) => `${prev}<img src="${imgUrl}"/>`);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("no file err");
    }
  });
  input.click();
};
