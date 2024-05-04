import CircledIconBtn from '@/components/buttons/circleButton'
import LoginInput from '@/components/inputs/loginInput'
import { Form, Formik } from 'formik'
import jwt from "jsonwebtoken";
import { BiLeftArrowAlt } from 'react-icons/bi'
import { ToastContainer } from 'react-toastify'
import styles from "@/styles/forgot-password.module.scss"
import { passwordValidation } from '@/validations/emailValidation'
const ResetTokenPage = ({userId}) => {
  const [loading,setLoading] = useState(false);
  const resetHandler = async ()=>{
    
    try{
      setLoading(true);
      const {data} = await baseURL.put('api/auth/reset',{
        userId,
        password
      });
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
            Reset your password ? 
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
                password:"",
                confirmPassword:""
              }}
              validationSchema={passwordValidation}
              onSubmit={resetHandler}
            >
              {
                (form) => (
                  <Form >
                    <LoginInput name="password" type="password" icon="email" placeholder={"enter your new password"} value={form?.values?.password} onChange={form?.handleChange} />
                    <LoginInput name="confirmPassword" type="password" icon="email" placeholder={"enter your confirm password"} value={form?.values?.confirmPassword} onChange={form?.handleChange} />
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

export default ResetTokenPage;


export async function getServerSideProps(context){
  const {query} = context;
  const {token} = query;
  const userId = jwt.verify(token,process.env.JWT_SECRET_TOKEN);
  return {
    props:{
      userId:userId?._id
    }
  }
}