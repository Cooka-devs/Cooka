import { useEffect } from "react";
interface useGetEnterKeyupProps {
  inputId: string;
  onClick: () => void;
}
function useGetEnterKeyup({ inputId, onClick }: useGetEnterKeyupProps) {
  useEffect(() => {
    const SearchInput = document.getElementById(inputId);
    if (SearchInput) {
      const handleEnterKey: EventListenerOrEventListenerObject = (event) => {
        const keyboardEvent = event as KeyboardEvent;
        if (keyboardEvent.key === "Enter") {
          event.preventDefault();
          onClick();
        }
      };
      SearchInput?.addEventListener("keyup", handleEnterKey);
      return () => {
        SearchInput.removeEventListener("keyup", handleEnterKey);
      };
    }
  }, [inputId, onClick]);
}
export default useGetEnterKeyup;
