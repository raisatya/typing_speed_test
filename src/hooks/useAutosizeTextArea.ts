import { useEffect } from 'react';

const useAutosizeTextArea = (textAreaRef: HTMLTextAreaElement | null, value: string) => {
  useEffect(() => {
    if (textAreaRef) {
      // Set the scroll to the bottom if the content exceeds the height
      textAreaRef.scrollTop = textAreaRef.scrollHeight;
    }
  }, [textAreaRef, value]);
};

export default useAutosizeTextArea;
