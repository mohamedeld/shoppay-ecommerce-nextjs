import Footer from '@/components/footer'
import Header from '@/components/header'
import React, { useState } from 'react'
import styles from "@/styles/signin.module.scss";
import Link from 'next/link';
import { BiLeftArrowAlt } from "react-icons/bi";
import { Form, Formik } from 'formik';
import LoginInput from '@/components/inputs/loginInput';
import loginValidation from '@/validations/loginValidation';
import CircledIconBtn from '@/components/buttons/circleButton';
import { getCsrfToken, getProviders, getSession, signIn } from 'next-auth/react';
import signUpValidation from '@/validations/signupValidation';
import axios from "axios";
import Image from 'next/image';
import baseURL from '@/config/config';
import { ToastContainer, toast } from 'react-toastify';
import LoadingShape from '@/components/loader/loadingShape';
import { useRouter } from 'next/router';
const initialValues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  mesage: ""
}
const SignInPage = ({ providers  ,csrfToken,
  callbackUrl}) => {
  const router = useRouter();
  const [user, setUser] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const { login_email, login_password, name, email, password } = user;
  function handleChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  async function onSubmit(data) {
    const submitData = {
      name: data?.name,
      email: data?.email,
      password: data?.password
    }
    try {
      setLoading(true);
      const { data } = await baseURL.post('api/auth/signup', submitData);
      setUser({ ...user, message: data?.message });
      toast.success("signup successfully");
      setLoading(false);
      router.push("/")
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message)
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  async function signInHandler() {
    try {
      setLoading(true);
      setTimeout(async ()=> {
        let options = {
          redirect: false,
          email: login_email,
          password: login_password
        }
        const res = await signIn("credentials", options);
        setUser({ ...user });
        setLoading(false);
        if (res?.error) {
          setLoading(false);
          toast.error(res?.error);
        } else {
          router.push(callbackUrl || '/');
        }
      }, 2000)
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <>
      <ToastContainer />
      {
        loading === true && <LoadingShape loading={loading} />
      }
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We&lsquo;d be happy to join us ! <Link href="/">Go Store</Link>
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
                login_email,
                login_password,

              }}
              validationSchema={loginValidation}
              onSubmit={signInHandler}
            >
              {
                (form) => (
                  <Form method="post" action="/api/auth/signin/email">
                    <input type="hidden" name="csrfToken" defaultValue={csrfToken}/>
                    <LoginInput name="login_email" type="email" icon="email" placeholder={"enter your email"} onChange={handleChange} />
                    <LoginInput name="login_password" type="password" icon="password" placeholder={"enter your password"} onChange={handleChange} />
                    <CircledIconBtn disabled={loading === true} type="submit" text="Sign in" />
                    <div className={styles.forgot}>
                      <Link href="/auth/forgot-password">Forget Password</Link>?
                    </div>
                  </Form>
                )
              }
            </Formik>
          </div>
        </div>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We&lsquo;d be happy to join us ! <Link href="/">Go Store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign Up</h1>
            <p>
              Get access to one of the best Eshopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password
              }}
              validationSchema={signUpValidation}
              onSubmit={onSubmit}
            >
              {
                (form) => (
                  <Form>
                    <LoginInput name="name" type="text" icon="user" placeholder={"enter your full name"} onChange={handleChange} />
                    <LoginInput name="email" type="email" icon="email" placeholder={"enter your email"} onChange={handleChange} />
                    <LoginInput name="password" type="password" icon="password" placeholder={"enter your password"} onChange={handleChange} />
                    <CircledIconBtn type="submit" text="Sign Up" />
                  </Form>
                )
              }
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Or continue with</span>
              <div className={styles.login__socials_wrap}>
                {providers.map((provider) => {
                  if(provider?.name === "Credentials"){
                    return;
                  } 
                  return (
                    <div key={provider?.name}>
                      <button className={styles.social__btn} onClick={() => signIn(provider?.id)}>
                        <Image src={`/icons/${provider?.name}.png`} alt={provider?.name} width={36} height={36} objectFit='cover' />
                        Sign in with {provider?.name}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default SignInPage;

export async function getServerSideProps(context) {
  const {req,query} = context;
  const session = await getSession({req});
  const {callbackUrl} = query;
  if(session){
    return {
      redirect:{
        destination:callbackUrl
      }
    }
  }
  const csrfToken = await getCsrfToken(context);

  const providers = Object.values(await getProviders());
  return {
    props: {
      providers,
      csrfToken,
      callbackUrl
    }
  }
}