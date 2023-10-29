import Image, { ImageProps } from "next/image";
import Styles from "./index.module.scss";

interface ListItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  imgProps?: ImageProps;
}

const ListItem = ({ children, onClick, imgProps }: ListItemProps) => {
  return (
    <div className={Styles.list_item} onClick={onClick}>
      {imgProps && (
        <div className={Styles.img_container}>
          <Image {...imgProps} alt={imgProps.alt} width={280} height={300} />
        </div>
      )}
      {children}
    </div>
  );
};
export default ListItem;
