import { useEffect } from "react";
interface useGetEnterKeyupProps {
  inputId: string;
  onClick: () => void;
}
function useGetEnterKeyup({ inputId, onClick }: useGetEnterKeyupProps) {
  useEffect(() => {
    if (!document) return;
    const SearchInput = document.getElementById(inputId);
    SearchInput?.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        onClick();
      }
    });
  }, [inputId, onClick]);
}
export default useGetEnterKeyup;
