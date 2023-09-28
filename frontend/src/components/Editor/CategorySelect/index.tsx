import { PLACECATEGORY, RECIPECATEGORY } from "@/constants";
interface CategorySelectProps {
  textType: string;
}
export const CategorySelect = ({ textType }: CategorySelectProps) => {
  if (textType === "recipe") {
    return RECIPECATEGORY.map((item, index) => (
      <option value={item} key={index}>
        {item}
      </option>
    ));
  } else if (textType === "place") {
    return PLACECATEGORY.map((item, index) => (
      <option value={item} key={index}>
        {item}
      </option>
    ));
  } else {
    return;
  }
};
