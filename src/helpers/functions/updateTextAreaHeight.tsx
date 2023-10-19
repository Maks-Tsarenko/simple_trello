export const updateTextAreaHeight = (textarea: HTMLTextAreaElement, minHeight: number) => {
  textarea.style.height = 'auto';
  textarea.style.height = `${Math.max(textarea.scrollHeight, minHeight)}px`;
};
