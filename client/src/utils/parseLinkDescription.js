const urlExpression =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

export const parseLinkDescription = (text) => {
  const result = text
    ?.split(" ")
    ?.map((item) => {
      if (item.match(urlExpression)) {
        return `<a class="hover:underline text-blue-500" target="_blank" href=${item}>${item}</a>`;
      }
      return item;
    })
    ?.join(" ");
  return result;
};
