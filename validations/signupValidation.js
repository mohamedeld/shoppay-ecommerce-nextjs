import * as Yup from 'yup';

const signUpValidation = Yup.object({
  name:Yup.string().required("please insert your full name"),
  email:Yup.string().required("email is required").email("please enter a valid email"),
  password:Yup.string().required("password is required"),
});

export default signUpValidation;