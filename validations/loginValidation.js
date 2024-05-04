import * as Yup from 'yup';

const loginValidation = Yup.object({
  login_email:Yup.string().required("your email address is required").email("please enter a valid email"),
  login_password:Yup.string().required("please enter your password")
});

export default loginValidation;