import { PLACECATEGORY, RECIPECATEGORY } from "@/constants";
interface CategorySelectProps {
  textType: string;
  modifyType?: string;
}
export const CategorySelect = ({
  textType,
  modifyType,
}: CategorySelectProps) => {
  if (textType === "recipe" || modifyType === "recipe") {
    return RECIPECATEGORY.map((item, index) => (
      <option value={item} key={index}>
        {item}
      </option>
    ));
  } else if (textType === "place" || modifyType === "place") {
    return PLACECATEGORY.map((item, index) => (
      <option value={item} key={index}>
        {item}
      </option>
    ));
  } else {
    return;
  }
};
