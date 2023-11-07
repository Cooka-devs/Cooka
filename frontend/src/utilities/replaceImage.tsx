import Image from "next/image";
import { domToReact } from "html-react-parser";

export const replaceImage = {
  replace: ({ name, attribs, children }: any) => {
    if (name === "figure" && /wp-block-image/.test(attribs.class)) {
      return <>{domToReact(children, replaceImage)}</>;
    }
    if (name === "img") {
      return (
        <Image
          src={attribs.src}
          width={attribs.width}
          height={attribs.height}
          alt={attribs.alt ? attribs.alt : "Blog post image"}
        />
      );
    }
  },
};
