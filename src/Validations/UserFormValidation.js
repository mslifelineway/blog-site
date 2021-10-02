import * as Yup from "yup";
import { regexList } from "../utils/constants";
export const newUserSchema = Yup.object().shape({
  name: Yup.string()
    .required({ nameError: "Please enter the name." })
    .matches(regexList.textWithoutSpecialOrSymbols, {
      message: { nameError: "No special chars or symbols allowed." },
      excludeEmptyStrings: true,
    })
    .min(3, { nameError: "Name should contain min 3 chars." })
    .max(50, { nameError: "Name should contain max 50 chars." }),

  email: Yup.string()
    .email({
      emailError: "Enter a valid email.",
    })
    .matches(regexList.emailWithDomain, {
      message: {
        emailError: "Enter a valid email. allowed: [ .com, .net, .org, .in]",
      },
      excludeEmptyStrings: true,
    })
    .min(6, { emailError: "Email should contain min 6 chars." })
    .max(50, { emailError: "Email should contain max 50 chars." })
    .required({ emailError: "Please enter the email." }),

  password: Yup.string()
    .required({ passwordError: "Please enter your password" })
    .matches(regexList.password, {
      message: {
        passwordError: "Enter a valid password.",
      },
    }),
});
export const loginUserSchema = Yup.object().shape({
  email: Yup.string()
    .email({
      emailError: "Enter a valid email.",
    })
    .matches(regexList.emailWithDomain, {
      message: {
        emailError: "Enter a valid email. allowed: [ .com, .net, .org, .in]",
      },
      excludeEmptyStrings: true,
    })
    .min(6, { emailError: "Email should contain min 6 chars." })
    .max(50, { emailError: "Email should contain max 50 chars." })
    .required({ emailError: "Please enter the email." }),

  password: Yup.string()
    .required({ passwordError: "Please enter your password" })
    .matches(regexList.password, {
      message: {
        passwordError: "Enter a valid password.",
      },
    }),
});
