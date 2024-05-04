import * as Yup from "yup";

const emailValidation = Yup.object({
  email:Yup.string().required("email is required").email("please enter a valid email"),
})

export default emailValidation

export const passwordValidation = Yup.object({
  email:Yup.string().required("password is required"),
  confirmPassword:Yup.string().required("confirm password is required").oneOf([Yup.ref('password'), null], 'Passwords must match')
})