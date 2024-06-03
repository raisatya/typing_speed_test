import { useEffect } from "react";

const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {
      // Reset the height to measure the scrollHeight
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;
      // Set the height to scrollHeight
      textAreaRef.style.height = `${scrollHeight}px`;
    }
  }, [textAreaRef, value]);
};

export default useAutosizeTextArea;
