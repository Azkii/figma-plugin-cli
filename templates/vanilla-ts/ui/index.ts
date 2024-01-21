addEventListener("load", () => {
  const container = document.getElementById("content-container");
  const template = document.getElementById(
    "content-template"
  ) as HTMLTemplateElement;

  container?.appendChild(template.content.cloneNode(true));
});
