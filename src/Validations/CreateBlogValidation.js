import * as Yup from "yup";

export const createBlogValidate = Yup.object().shape({
  title: Yup.string()
    .required({ title: "Please enter the title." })
    .min(3, { title: "Title should contain min 3 chars." })
    .max(500, { title: "Title should contain max 500 chars." }),
  content: Yup.string()
    .required({ content: "Please enter the content." })
    .min(3, { content: "Content should contain min 3 chars." }),
});
