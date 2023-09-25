import { Recipe } from "@/types";
import axios from "axios";
export const getReipce = async () => {
  try {
    const result = await axios.get(
      `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:8000/recipe`
    );
    return result.data.data;
  } catch (err) {
    console.log(err);
  }
};
