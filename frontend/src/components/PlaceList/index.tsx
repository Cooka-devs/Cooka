import PlaceItem from "./PlaceItem";
import Styles from "./index.module.css";
import { PlaceProps } from "@/types";
interface PlaceListProps {
  items: PlaceProps[];
}
const PlaceList = ({ items }: PlaceListProps) => {
  return (
    <div className={Styles.list_container}>
      {items.map((place, index) => {
        return <PlaceItem item={place} key={index} />;
      })}
    </div>
  );
};
export default PlaceList;
