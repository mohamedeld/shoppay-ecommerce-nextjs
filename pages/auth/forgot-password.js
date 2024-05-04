import CircledIconBtn from "@/components/buttons/circleButton";
import LoginInput from "@/components/inputs/loginInput";
import baseURL from "@/config/config";
import styles from "@/styles/forgot-password.module.scss";
import emailValidation from "@/validations/emailValidation";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";



const ForgotPassword = () => {
  const [loading,setLoading] = useState(false);
  const emailHandler = async (data)=>{
    const submitData = {
      email:data?.email
    }
    try{
      setLoading(true);
      const {data} = await baseURL.post('api/auth/forget-password',submitData);
      toast.success(data?.message);
      setLoading(false);
    }catch(error){
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      setLoading(false);

    }
  }
  return (
    <>
    <ToastContainer/>
    <div className={styles.forgot}>
      <div>
        <div className={styles.login__header}>
          <div className={styles.back__svg}>
            <BiLeftArrowAlt/>
          </div>
          <span>
            Forgot your password ? 
          </span>
        </div>
        <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>
              Get access to one of the best Eshopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                email:""
              }}
              validationSchema={emailValidation}
              onSubmit={emailHandler}
            >
              {
                (form) => (
                  <Form >
                    <LoginInput name="email" type="text" icon="email" placeholder={"enter your email"} value={form?.values?.email} onChange={form?.handleChange} />
                    <CircledIconBtn disabled={loading === true} type="submit" text="Forogt Password" />
                  </Form>
                )
              }
            </Formik>
            </div>
      </div>
    </div>
    </>
  )
}

export default ForgotPassword