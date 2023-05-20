export const editorModules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      ["image"],

      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],

      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
    ],

    handlers: {
      image: imageHandler,
    },
  },
};

function imageHandler(this: any) {
  const range = this.quill.getSelection();
  const value = prompt("Please insert the image URL");
  if (value) {
    this.quill.insertEmbed(range.index, "image", value);
  }
}
